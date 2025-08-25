// client/src/components/ThreeDChart.jsx
import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';

// A single bar component
const Bar = ({ position, size, color, data, onPointerOver, onPointerOut }) => {
  return (
    <mesh 
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); onPointerOver(data); }}
      onPointerOut={(e) => { e.stopPropagation(); onPointerOut(); }}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const ThreeDChart = ({ excelData, xAxis, yAxis }) => {
  const [hovered, setHovered] = useState(null);

  if (!excelData || excelData.length === 0 || !xAxis || !yAxis) {
    return <div className="text-center p-4">Please select valid X and Y axes.</div>;
  }

  // Find max value for normalization
  const yValues = excelData.map(d => d[yAxis]).filter(v => !isNaN(v));
  const maxValue = Math.max(...yValues, 1); // Avoid division by zero
  const barWidth = 0.8;
  const gap = 0.2;

  return (
    <div style={{ height: '500px', width: '100%', backgroundColor: '#f0f0f0' }}>
      <Canvas camera={{ position: [5, 5, 10], fov: 60 }}>
        {/* Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />

        {/* Controls to allow user to rotate/pan/zoom */}
        <OrbitControls />

        <group>
          {excelData.map((row, index) => {
            const xVal = row[xAxis];
            const yVal = isNaN(row[yAxis]) ? 0 : row[yAxis];
            const height = (yVal / maxValue) * 8; // Normalize height (max height of 8)
            const xPos = index * (barWidth + gap);

            return (
              <group key={index}>
                <Bar
                  position={[xPos, height / 2, 0]}
                  size={[barWidth, height, barWidth]}
                  color={hovered?.index === index ? '#ff6384' : '#36a2eb'}
                  data={{ index, x: xVal, y: yVal }}
                  onPointerOver={(data) => setHovered(data)}
                  onPointerOut={() => setHovered(null)}
                />
                <Text
                  position={[xPos, -0.5, 0]}
                  fontSize={0.3}
                  color="black"
                  anchorX="center"
                  anchorY="middle"
                >
                  {xVal}
                </Text>
              </group>
            );
          })}
        </group>

        {/* Tooltip on hover */}
        {hovered && (
          <Html position={[hovered.index * (barWidth + gap), (hovered.y / maxValue) * 8 + 0.5, 0]}>
            <div className="bg-white p-2 rounded shadow-lg text-xs">
              <div>{xAxis}: {hovered.x}</div>
              <div>{yAxis}: {hovered.y}</div>
            </div>
          </Html>
        )}
      </Canvas>
    </div>
  );
};

export default ThreeDChart;