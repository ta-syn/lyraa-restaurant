import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#080808',
          border: '3px solid rgba(212, 168, 83, 0.2)',
          borderRadius: 34,
          color: '#D4A853',
          fontFamily: 'serif',
          fontSize: 108,
          fontWeight: 'bold',
        }}
      >
        L
      </div>
    ),
    { ...size }
  );
}
