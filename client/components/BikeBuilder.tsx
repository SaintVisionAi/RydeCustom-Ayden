import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { ArrowLeft, RotateCw, ShoppingCart } from "lucide-react";

interface BikeConfig {
  frameColor: string;
  frameType: string;
  wheelType: string;
  exhaustType: string;
  brakeType: string;
  suspensionType: string;
  price: number;
}

const FRAME_TYPES = [
  { name: "Aluminum", color: "#c0c0c0", price: 0 },
  { name: "Carbon", color: "#1a1a1a", price: 500 },
  { name: "Titanium", color: "#d3d3d3", price: 800 },
];

const FRAME_COLORS = [
  { name: "Matte Black", hex: "#1a1a1a" },
  { name: "Metallic Gold", hex: "#d4af37" },
  { name: "Neon Orange", hex: "#ff6b00" },
  { name: "Racing Red", hex: "#dc143c" },
  { name: "Pearl White", hex: "#f0f0f0" },
  { name: "Deep Blue", hex: "#00008b" },
];

const WHEEL_TYPES = [
  { name: "Warp 9 Racing", price: 400 },
  { name: "Aluminum Stock", price: 200 },
  { name: "Carbon Sport", price: 600 },
  { name: "Forged Alloy", price: 350 },
];

const EXHAUST_TYPES = [
  { name: "Akrapovič", price: 1200 },
  { name: "Yoshimura", price: 900 },
  { name: "Two Brothers", price: 850 },
  { name: "Stock", price: 0 },
];

const BRAKE_TYPES = [
  { name: "Brembo Sport", price: 600 },
  { name: "Brembo Carbon", price: 1000 },
  { name: "PUIG", price: 400 },
  { name: "Stock", price: 0 },
];

const SUSPENSION_TYPES = [
  { name: "KYB Premium", price: 800 },
  { name: "Showa Sport", price: 700 },
  { name: "Stock", price: 0 },
];

function createModernBike(config: BikeConfig): THREE.Group {
  const group = new THREE.Group();

  // Frame material
  const frameMaterial = new THREE.MeshPhongMaterial({
    color: config.frameColor,
    shininess: 100,
    metalness: 0.3,
  });

  // Main frame tube (backbone)
  const backboneGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.8, 16);
  const backbone = new THREE.Mesh(backboneGeometry, frameMaterial);
  backbone.castShadow = true;
  backbone.receiveShadow = true;
  backbone.rotation.z = Math.PI / 8;
  backbone.position.set(0.05, 0.6, 0);
  group.add(backbone);

  // Swingarm (rear frame)
  const swingarmGeometry = new THREE.CylinderGeometry(0.06, 0.06, 1.1, 16);
  const swingarm = new THREE.Mesh(swingarmGeometry, frameMaterial);
  swingarm.castShadow = true;
  swingarm.receiveShadow = true;
  swingarm.rotation.z = Math.PI / 2;
  swingarm.position.set(0.1, 0.4, -0.3);
  group.add(swingarm);

  // Fork tubes (front suspension)
  const forkGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 16);
  const forkMaterial = new THREE.MeshPhongMaterial({
    color: "#2a2a2a",
    shininess: 120,
  });

  const forkLeft = new THREE.Mesh(forkGeometry, forkMaterial);
  forkLeft.castShadow = true;
  forkLeft.receiveShadow = true;
  forkLeft.position.set(-0.15, 0.5, 0.9);
  group.add(forkLeft);

  const forkRight = new THREE.Mesh(forkGeometry, forkMaterial);
  forkRight.castShadow = true;
  forkRight.receiveShadow = true;
  forkRight.position.set(0.15, 0.5, 0.9);
  group.add(forkRight);

  // Front wheel with spokes (Warp 9 style)
  const wheelGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.12, 32);
  const wheelMaterial = new THREE.MeshPhongMaterial({
    color: "#1a1a1a",
    shininess: 80,
  });

  const frontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
  frontWheel.castShadow = true;
  frontWheel.receiveShadow = true;
  frontWheel.rotation.z = Math.PI / 2;
  frontWheel.position.set(0, 0.35, 0.95);
  group.add(frontWheel);

  // Tire (outer ring)
  const tireGeometry = new THREE.TorusGeometry(0.38, 0.06, 16, 32);
  const tireMaterial = new THREE.MeshPhongMaterial({ color: "#0a0a0a" });
  const frontTire = new THREE.Mesh(tireGeometry, tireMaterial);
  frontTire.castShadow = true;
  frontTire.receiveShadow = true;
  frontTire.rotation.y = Math.PI / 2;
  frontTire.position.set(0, 0.35, 0.95);
  group.add(frontTire);

  // Rear wheel
  const rearWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
  rearWheel.castShadow = true;
  rearWheel.receiveShadow = true;
  rearWheel.rotation.z = Math.PI / 2;
  rearWheel.position.set(0, 0.35, -0.7);
  group.add(rearWheel);

  const rearTire = new THREE.Mesh(tireGeometry, tireMaterial);
  rearTire.castShadow = true;
  rearTire.receiveShadow = true;
  rearTire.rotation.y = Math.PI / 2;
  rearTire.position.set(0, 0.35, -0.7);
  group.add(rearTire);

  // Engine block (modern, compact)
  const engineGeometry = new THREE.BoxGeometry(0.4, 0.35, 0.5);
  const engineMaterial = new THREE.MeshPhongMaterial({
    color: "#333333",
    shininess: 90,
  });
  const engine = new THREE.Mesh(engineGeometry, engineMaterial);
  engine.castShadow = true;
  engine.receiveShadow = true;
  engine.position.set(0.08, 0.45, 0.05);
  group.add(engine);

  // Exhaust pipe (prominent, sporty)
  const exhaustGeometry = new THREE.CylinderGeometry(0.12, 0.08, 0.7, 16);
  const exhaustMaterial = new THREE.MeshPhongMaterial({
    color: "#555555",
    shininess: 60,
  });
  const exhaust = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
  exhaust.castShadow = true;
  exhaust.receiveShadow = true;
  exhaust.rotation.z = Math.PI / 3.5;
  exhaust.position.set(-0.25, 0.35, -0.1);
  group.add(exhaust);

  // Exhaust tip
  const tipGeometry = new THREE.CylinderGeometry(0.08, 0.06, 0.15, 16);
  const tipMaterial = new THREE.MeshPhongMaterial({ color: "#666666" });
  const tip = new THREE.Mesh(tipGeometry, tipMaterial);
  tip.castShadow = true;
  tip.receiveShadow = true;
  tip.rotation.z = Math.PI / 3.5;
  tip.position.set(-0.4, 0.15, -0.25);
  group.add(tip);

  // Fuel tank (modern design)
  const tankGeometry = new THREE.BoxGeometry(0.3, 0.35, 0.6);
  const tankMaterial = new THREE.MeshPhongMaterial({
    color: config.frameColor,
    shininess: 110,
    metalness: 0.2,
  });
  const tank = new THREE.Mesh(tankGeometry, tankMaterial);
  tank.castShadow = true;
  tank.receiveShadow = true;
  tank.position.set(-0.05, 0.8, 0.15);
  // Round corners slightly
  tank.geometry.computeVertexNormals();
  group.add(tank);

  // Seat (sleek, angular)
  const seatGeometry = new THREE.BoxGeometry(0.28, 0.15, 0.5);
  const seatMaterial = new THREE.MeshPhongMaterial({
    color: "#1a1a1a",
    shininess: 80,
  });
  const seat = new THREE.Mesh(seatGeometry, seatMaterial);
  seat.castShadow = true;
  seat.receiveShadow = true;
  seat.position.set(-0.05, 1.05, -0.15);
  group.add(seat);

  // Handlebars
  const barGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.35, 16);
  const barMaterial = new THREE.MeshPhongMaterial({
    color: "#444444",
    shininess: 90,
  });
  const handlebars = new THREE.Mesh(barGeometry, barMaterial);
  handlebars.castShadow = true;
  handlebars.receiveShadow = true;
  handlebars.rotation.x = Math.PI / 6;
  handlebars.position.set(0, 1.3, 0.85);
  group.add(handlebars);

  // Brake disc (front)
  const discGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.03, 32);
  const discMaterial = new THREE.MeshPhongMaterial({
    color: "#8b0000",
    shininess: 100,
  });
  const brakeFront = new THREE.Mesh(discGeometry, discMaterial);
  brakeFront.castShadow = true;
  brakeFront.receiveShadow = true;
  brakeFront.rotation.z = Math.PI / 2;
  brakeFront.position.set(-0.18, 0.35, 0.95);
  group.add(brakeFront);

  // Headlight
  const lightGeometry = new THREE.SphereGeometry(0.08, 16, 16);
  const lightMaterial = new THREE.MeshPhongMaterial({
    color: "#ffff00",
    emissive: "#ffff00",
    emissiveIntensity: 0.3,
  });
  const headlight = new THREE.Mesh(lightGeometry, lightMaterial);
  headlight.castShadow = true;
  headlight.receiveShadow = true;
  headlight.position.set(0, 1, 1);
  group.add(headlight);

  // Tail light
  const tailGeometry = new THREE.SphereGeometry(0.06, 16, 16);
  const tailMaterial = new THREE.MeshPhongMaterial({
    color: "#ff0000",
    emissive: "#ff0000",
    emissiveIntensity: 0.2,
  });
  const tailLight = new THREE.Mesh(tailGeometry, tailMaterial);
  tailLight.castShadow = true;
  tailLight.receiveShadow = true;
  tailLight.position.set(0, 0.9, -0.85);
  group.add(tailLight);

  // Fairings (modern aerodynamic panels)
  const fairingGeometry = new THREE.BoxGeometry(0.25, 0.4, 0.55);
  const fairingMaterial = new THREE.MeshPhongMaterial({
    color: config.frameColor,
    shininess: 120,
    metalness: 0.15,
  });
  const fairing = new THREE.Mesh(fairingGeometry, fairingMaterial);
  fairing.castShadow = true;
  fairing.receiveShadow = true;
  fairing.position.set(0, 0.9, 0.3);
  group.add(fairing);

  group.castShadow = true;
  group.receiveShadow = true;

  return group;
}

interface BikeBuilderProps {
  onClose?: () => void;
}

export default function BikeBuilder({ onClose }: BikeBuilderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const bikeRef = useRef<THREE.Group | null>(null);

  const [config, setConfig] = useState<BikeConfig>({
    frameColor: "#b8860b",
    frameType: "Aluminum",
    wheelType: "Warp 9 Racing",
    exhaustType: "Akrapovič",
    brakeType: "Brembo Sport",
    suspensionType: "KYB Premium",
    price: 3499.99,
  });

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfafafa);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.8, 2.2);
    camera.lookAt(0, 0.5, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(8, 12, 6);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.left = -5;
    directionalLight.shadow.camera.right = 5;
    directionalLight.shadow.camera.top = 5;
    directionalLight.shadow.camera.bottom = -5;
    scene.add(directionalLight);

    // Point light for rim glow
    const pointLight = new THREE.PointLight(0xb8860b, 0.4);
    pointLight.position.set(2, 1, 2);
    scene.add(pointLight);

    // Create bike
    const bike = createModernBike(config);
    scene.add(bike);
    bikeRef.current = bike;

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(12, 12);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (bikeRef.current) {
        bikeRef.current.rotation.y = rotation;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [rotation, config]);

  const handleRotate360 = () => {
    let currentRotation = rotation;
    const interval = setInterval(() => {
      currentRotation += 0.05;
      if (currentRotation >= rotation + Math.PI * 2) {
        clearInterval(interval);
        setRotation(currentRotation - Math.PI * 2);
      } else {
        setRotation(currentRotation);
      }
    }, 16);
  };

  const calculatePrice = () => {
    const framePrice = FRAME_TYPES.find(
      (f) => f.name === config.frameType
    )?.price || 0;
    const wheelPrice =
      WHEEL_TYPES.find((w) => w.name === config.wheelType)?.price || 0;
    const exhaustPrice =
      EXHAUST_TYPES.find((e) => e.name === config.exhaustType)?.price || 0;
    const brakePrice =
      BRAKE_TYPES.find((b) => b.name === config.brakeType)?.price || 0;
    const suspensionPrice =
      SUSPENSION_TYPES.find((s) => s.name === config.suspensionType)?.price ||
      0;

    return 2499.99 + framePrice + wheelPrice + exhaustPrice + brakePrice + suspensionPrice;
  };

  const handleAddToCart = () => {
    const cartItem = {
      type: "bike",
      name: "Custom E-Moto Build",
      config,
      price: calculatePrice(),
      quantity: 1,
    };
    localStorage.setItem("lastCustomBike", JSON.stringify(cartItem));
    alert(`Added custom bike to cart! Total: $${calculatePrice().toFixed(2)}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {onClose && (
        <div className="p-4 border-b border-border">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      )}

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* 3D Canvas */}
        <div className="lg:col-span-2">
          <div className="rounded-xl overflow-hidden border-2 border-border bg-white h-full min-h-96">
            <div
              ref={containerRef}
              style={{ width: "100%", height: "500px" }}
            />
            <div className="p-4 bg-slate-50 border-t border-border flex gap-3">
              <button
                onClick={handleRotate360}
                className="flex-1 btn-outline border-primary text-primary py-2 px-4 flex items-center justify-center gap-2"
              >
                <RotateCw className="w-4 h-4" />
                Rotate 360°
              </button>
              <button
                onClick={() => setRotation((r) => r + Math.PI / 4)}
                className="flex-1 btn-outline border-primary text-primary py-2 px-4"
              >
                ↻ Manual
              </button>
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="space-y-6 overflow-y-auto max-h-[700px]">
          {/* Frame Color */}
          <div className="bg-white rounded-xl border-2 border-border p-6">
            <h3 className="font-bold text-lg mb-4">Frame Color</h3>
            <div className="grid grid-cols-3 gap-3">
              {FRAME_COLORS.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setConfig({ ...config, frameColor: color.hex })}
                  className={`w-full aspect-square rounded-lg border-2 transition-all ${
                    config.frameColor === color.hex
                      ? "border-primary ring-2 ring-primary"
                      : "border-border hover:border-primary"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Frame Type */}
          <div className="bg-white rounded-xl border-2 border-border p-6">
            <h3 className="font-bold text-lg mb-4">Frame Material</h3>
            <div className="space-y-2">
              {FRAME_TYPES.map((type) => (
                <button
                  key={type.name}
                  onClick={() => setConfig({ ...config, frameType: type.name })}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    config.frameType === type.name
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold text-sm">{type.name}</div>
                  <div className="text-xs text-muted-foreground">
                    +${type.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Wheels */}
          <div className="bg-white rounded-xl border-2 border-border p-6">
            <h3 className="font-bold text-lg mb-4">Wheels</h3>
            <div className="space-y-2">
              {WHEEL_TYPES.map((wheel) => (
                <button
                  key={wheel.name}
                  onClick={() => setConfig({ ...config, wheelType: wheel.name })}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    config.wheelType === wheel.name
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold text-sm">{wheel.name}</div>
                  <div className="text-xs text-muted-foreground">
                    +${wheel.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Exhaust */}
          <div className="bg-white rounded-xl border-2 border-border p-6">
            <h3 className="font-bold text-lg mb-4">Exhaust System</h3>
            <div className="space-y-2">
              {EXHAUST_TYPES.map((exhaust) => (
                <button
                  key={exhaust.name}
                  onClick={() => setConfig({ ...config, exhaustType: exhaust.name })}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    config.exhaustType === exhaust.name
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold text-sm">{exhaust.name}</div>
                  <div className="text-xs text-muted-foreground">
                    +${exhaust.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Brakes */}
          <div className="bg-white rounded-xl border-2 border-border p-6">
            <h3 className="font-bold text-lg mb-4">Brakes</h3>
            <div className="space-y-2">
              {BRAKE_TYPES.map((brake) => (
                <button
                  key={brake.name}
                  onClick={() => setConfig({ ...config, brakeType: brake.name })}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    config.brakeType === brake.name
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold text-sm">{brake.name}</div>
                  <div className="text-xs text-muted-foreground">
                    +${brake.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Suspension */}
          <div className="bg-white rounded-xl border-2 border-border p-6">
            <h3 className="font-bold text-lg mb-4">Suspension</h3>
            <div className="space-y-2">
              {SUSPENSION_TYPES.map((suspension) => (
                <button
                  key={suspension.name}
                  onClick={() => setConfig({ ...config, suspensionType: suspension.name })}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    config.suspensionType === suspension.name
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold text-sm">{suspension.name}</div>
                  <div className="text-xs text-muted-foreground">
                    +${suspension.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary/20 sticky bottom-0">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Custom Bike Total</p>
              <p className="text-4xl font-bold text-primary">
                ${calculatePrice().toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 font-bold"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
