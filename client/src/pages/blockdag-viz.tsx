import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Play, Pause, RotateCw, Info } from "lucide-react";

export default function BlockDAGVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    blocks: THREE.Mesh[];
    lines: THREE.Line[];
    animationId?: number;
  } | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const isPlayingRef = useRef(true);
  const timeRef = useRef(0);
  const newBlockTimerRef = useRef(0);
  const lastFrameTimeRef = useRef(performance.now());
  const [blockCount, setBlockCount] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    scene.add(gridHelper);

    const blocks: THREE.Mesh[] = [];
    const lines: THREE.Line[] = [];

    function createBlock(x: number, y: number, z: number, color: number = 0xff9500): THREE.Mesh {
      const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.2,
        shininess: 100,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, z);
      scene.add(cube);
      blocks.push(cube);
      setBlockCount(blocks.length);
      return cube;
    }

    function createConnection(from: THREE.Vector3, to: THREE.Vector3, color: number = 0x666666) {
      const points = [from.clone(), to.clone()];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: color, opacity: 0.6, transparent: true });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      lines.push(line);
      return line;
    }

    createBlock(0, 0, 0, 0x4444ff);

    const layer1 = [
      createBlock(-2, 0, -2),
      createBlock(2, 0, -2),
    ];
    createConnection(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-2, 0, -2));
    createConnection(new THREE.Vector3(0, 0, 0), new THREE.Vector3(2, 0, -2));

    const layer2 = [
      createBlock(-3, 0, -4),
      createBlock(0, 0, -4),
      createBlock(3, 0, -4),
    ];
    createConnection(new THREE.Vector3(-2, 0, -2), new THREE.Vector3(-3, 0, -4));
    createConnection(new THREE.Vector3(-2, 0, -2), new THREE.Vector3(0, 0, -4));
    createConnection(new THREE.Vector3(2, 0, -2), new THREE.Vector3(0, 0, -4));
    createConnection(new THREE.Vector3(2, 0, -2), new THREE.Vector3(3, 0, -4));

    const newBlockDelay = 2;

    sceneRef.current = { scene, camera, renderer, blocks, lines };

    function animate() {
      if (!sceneRef.current || !containerRef.current) return;

      const animationId = requestAnimationFrame(animate);
      sceneRef.current.animationId = animationId;

      const now = performance.now();
      const delta = (now - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = now;

      timeRef.current += delta;

      blocks.forEach((block, i) => {
        block.rotation.y += 0.005;
        block.position.y = Math.sin(timeRef.current + i * 0.5) * 0.1;
      });

      camera.position.x = Math.sin(timeRef.current * 0.1) * 15;
      camera.position.z = Math.cos(timeRef.current * 0.1) * 15;
      camera.lookAt(0, 0, -2);

      if (isPlayingRef.current) {
        newBlockTimerRef.current += delta;
        
        if (newBlockTimerRef.current >= newBlockDelay && blocks.length < 30) {
          newBlockTimerRef.current = 0;
        const lastZ = Math.min(...blocks.map(b => b.position.z));
        const x = (Math.random() - 0.5) * 6;
        const newBlock = createBlock(x, 0, lastZ - 2);
        
        const nearbyBlocks = blocks.filter(
          b => b !== newBlock && Math.abs(b.position.z - newBlock.position.z) < 3
        );
          nearbyBlocks.slice(0, 2).forEach(b => {
            createConnection(b.position, newBlock.position);
          });
        }
      }

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      sceneRef.current.camera.aspect = width / height;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (sceneRef.current) {
        if (sceneRef.current.animationId) {
          cancelAnimationFrame(sceneRef.current.animationId);
        }
        sceneRef.current.renderer.dispose();
        containerRef.current?.removeChild(sceneRef.current.renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const handleReset = () => {
    if (!sceneRef.current) return;
    const { scene, blocks, lines } = sceneRef.current;
    
    blocks.forEach(block => scene.remove(block));
    lines.forEach(line => scene.remove(line));
    blocks.length = 0;
    lines.length = 0;
    setBlockCount(0);
    
    timeRef.current = 0;
    newBlockTimerRef.current = 0;
    lastFrameTimeRef.current = performance.now();

    const createBlock = (x: number, y: number, z: number, color: number = 0xff9500): THREE.Mesh => {
      const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.2,
        shininess: 100,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, z);
      scene.add(cube);
      blocks.push(cube);
      setBlockCount(blocks.length);
      return cube;
    };

    const createConnection = (from: THREE.Vector3, to: THREE.Vector3, color: number = 0x666666) => {
      const points = [from.clone(), to.clone()];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: color, opacity: 0.6, transparent: true });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      lines.push(line);
      return line;
    };

    createBlock(0, 0, 0, 0x4444ff);

    const layer1 = [
      createBlock(-2, 0, -2),
      createBlock(2, 0, -2),
    ];
    createConnection(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-2, 0, -2));
    createConnection(new THREE.Vector3(0, 0, 0), new THREE.Vector3(2, 0, -2));

    const layer2 = [
      createBlock(-3, 0, -4),
      createBlock(0, 0, -4),
      createBlock(3, 0, -4),
    ];
    createConnection(new THREE.Vector3(-2, 0, -2), new THREE.Vector3(-3, 0, -4));
    createConnection(new THREE.Vector3(-2, 0, -2), new THREE.Vector3(0, 0, -4));
    createConnection(new THREE.Vector3(2, 0, -2), new THREE.Vector3(0, 0, -4));
    createConnection(new THREE.Vector3(2, 0, -2), new THREE.Vector3(3, 0, -4));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-5xl md:text-7xl font-bold mb-4" data-testid="text-blockdag-title">
          BlockDAG <span className="text-primary">Visualization</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Interactive 3D visualization of parallel block production
        </p>

        <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">
                Unlike traditional blockchains with linear chains, Citrate uses a BlockDAG (Directed Acyclic Graph) structure powered by GhostDAG consensus.
              </p>
              <p>
                Watch as multiple blocks are produced in parallel, each referencing multiple parent blocks. This enables 10,000+ TPS throughput while maintaining security.
              </p>
            </div>
          </div>
        </div>

        <div className="border-2 border-border rounded-lg overflow-hidden">
          <div className="bg-card border-b-2 border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-border rounded-lg hover:border-primary/50 transition-all"
                data-testid="button-play-pause"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Play</span>
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 border-2 border-border rounded-lg hover:border-primary/50 transition-all"
                data-testid="button-reset"
              >
                <RotateCw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Blocks: </span>
              <span className="font-bold text-primary" data-testid="text-block-count">
                {blockCount}
              </span>
            </div>
          </div>

          <div
            ref={containerRef}
            className="w-full bg-background"
            style={{ height: "600px" }}
            data-testid="canvas-container"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="border-2 border-border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-primary">Genesis Block</h3>
            <p className="text-sm text-muted-foreground">
              The blue block represents the genesis block - the first block in the DAG. All subsequent blocks reference back to it.
            </p>
          </div>

          <div className="border-2 border-border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-primary">Parallel Production</h3>
            <p className="text-sm text-muted-foreground">
              Orange blocks are produced simultaneously by different validators. Each new block references multiple parent blocks.
            </p>
          </div>

          <div className="border-2 border-border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-primary">DAG Structure</h3>
            <p className="text-sm text-muted-foreground">
              Gray lines show parent-child relationships. This structure enables high throughput while maintaining consensus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
