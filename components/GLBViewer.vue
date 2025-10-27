<script setup lang="ts">

    import * as THREE from 'three'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

    const props = defineProps<{ src?: string }>()
    const root = ref<HTMLElement | null>(null)
    const canvas = ref<HTMLCanvasElement | null>(null)
    const loaded = ref(false)

    let scene: THREE.Scene | null = null
    let camera: THREE.PerspectiveCamera | null = null
    let renderer: THREE.WebGLRenderer | null = null
    let controls: OrbitControls | null = null
    let mixer: THREE.AnimationMixer | null = null
    let raf = 0
    let clock = new THREE.Clock()
    let group: THREE.Group | null = null

    onMounted(async () => { if (!canvas.value || !root.value) return

        root.value.style.height = window.innerHeight + 'px'

        scene = new THREE.Scene()

        camera = new THREE.PerspectiveCamera(45, root.value.clientWidth / root.value.clientHeight, 0.1, 1000)
        camera.position.set(0, 1.6, 3)

        renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true, alpha: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(root.value.clientWidth, root.value.clientHeight)
        renderer.setClearColor(0x000000, 0)

        controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.autoRotate = true
        controls.enableZoom = false
        controls.autoRotateSpeed = 1.0
        controls.enableRotate = true
        controls.minPolarAngle = 60 * Math.PI / 180
        controls.maxPolarAngle = 90 * Math.PI / 180
        controls.target.set(0, 1, 0)
        controls.update()

        group = new THREE.Group(); scene.add(group)

        window.addEventListener('resize', () => {
            if (!root.value || !camera || !renderer) return
            root.value.style.height = window.innerHeight + 'px'
            const w = root.value.clientWidth
            const h = root.value.clientHeight || 400
            camera.aspect = w / h
            camera.updateProjectionMatrix()
            renderer.setSize(w, h)
        })

        const animate = () => {
            raf = requestAnimationFrame(animate)
            if (mixer) mixer.update(clock.getDelta())
            if (controls) controls.update()
            if (renderer && scene && camera) renderer.render(scene, camera)
        }; animate()

        if (props.src && group) { 
            
            if (!group) return
            group.traverse((obj: THREE.Mesh) => {
                if (obj.geometry) obj.geometry.dispose()
                if (obj.material) {
                    const mat = obj.material
                    if (Array.isArray(mat)) mat.forEach((m) => m.dispose && m.dispose())
                    else mat.dispose && mat.dispose()
                }
            })
            while (group.children.length) group.remove(group.children[0])
            mixer = null; loaded.value = false
        
            try {
                const loader = new GLTFLoader(); 
                const gltf = await loader.loadAsync(props.src)

                group.add(gltf.scene)

                gltf.scene.scale.setScalar(0.5)

                gltf.scene.traverse((obj: any) => {
                    if (obj.isMesh) {
                        const shader = new THREE.ShaderMaterial({
                            uniforms: {
                                light: { value: new THREE.Vector3(0.5, 1.0, 0.75).normalize() },
                            },
                            vertexShader: `
                                varying vec3 vNormal;
                                void main() {
                                    vNormal = normalize(normalMatrix * normal);
                                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                                }
                            `,
                            fragmentShader: `
                                uniform vec3 light;
                                varying vec3 vNormal;

                                vec3 baseColor = vec3(0.0, 0.478, 0.333); // #007A55

                                void main() {
                                    float intensity = dot(normalize(vNormal), light);
                                    intensity = clamp(intensity * 0.5 + 0.5, 0.0, 1.0);

                                    float bands = 10.0;
                                    float stepped = floor(intensity * bands) / bands;
                                    float blend = smoothstep(0.0, 1.0, fract(intensity * bands));
                                    float finalIntensity = mix(stepped, stepped + 1.0 / bands, blend * 0.25);


                                    float ambient = 0.1;

                                    // смешиваем базовый зелёный с более светлым оттенком
                                    vec3 lightColor = vec3(0.85, 1.0, 0.9);
                                    vec3 color = mix(baseColor * 0.6, lightColor, finalIntensity);
                                    color = mix(color, baseColor, ambient * (1.0 - intensity)); // подсветка теней зелёным

                                    gl_FragColor = vec4(color, 1.0);
                                }
                            `,
                        })
                        shader.flatShading = true
                        shader.side = THREE.DoubleSide
                        obj.material = shader
                    }

                })

                const box = new THREE.Box3().setFromObject(gltf.scene)
                const size = new THREE.Vector3(); box.getSize(size)
                const center = new THREE.Vector3(); box.getCenter(center)
                const dim = Math.max(size.x, size.y, size.z); center.y += dim * -0.1
                const fov = (camera!.fov * Math.PI) / 180
                let dist = Math.abs(dim / 2 / Math.tan(fov / 2)); dist *= 2

                camera!.position.set(center.x, center.y + dim * 0.2, center.z + dist)
                camera!.lookAt(center)
                
                if (controls) controls.target.copy(center)
                if (gltf.animations && gltf.animations.length) {
                    mixer = new THREE.AnimationMixer(gltf.scene)
                    gltf.animations.forEach((clip: any) => mixer!.clipAction(clip).play())
                }
                    
                loaded.value = true

            } catch (err) { console.error('load error', err) } 

        }

    })
</script>

<template>
    <div class="viewer" ref="root">
        <canvas ref="canvas" />
    </div>
</template>

<style scoped>
.viewer {
    width: 100%;
    display: block;
}
canvas {
    display: block;
}
</style>
