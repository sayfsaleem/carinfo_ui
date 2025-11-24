import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'CarInfo UK - Free UK Vehicle History Check';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #0069d9 0%, #007bff 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          CarInfo UK
        </div>
        <div
          style={{
            fontSize: 40,
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.3,
          }}
        >
          Free UK Vehicle History Check
        </div>
        <div
          style={{
            fontSize: 32,
            marginTop: 30,
            opacity: 0.9,
            textAlign: 'center',
          }}
        >
          MOT, Tax & Mileage + Full HPI Upgrade
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
