'use client';

import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Suspense, useMemo } from 'react';
import Expirience from './Expirience';

export enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
  crouch = 'crouch',
}

export default function Scene() {
  const mapControls = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: Controls.jump, keys: ['Space'] },
      { name: Controls.crouch, keys: ['KeyS', 'ArrowDown'] },
    ],
    []
  );

  return (
    <KeyboardControls map={mapControls}>
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 30 }}>
        <color attach="background" args={['#ececec']} />
        <Suspense>
          <Physics debug>
            <Expirience />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
}
