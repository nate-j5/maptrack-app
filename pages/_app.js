// src/pages/_app.js
import Layout from '../src/components/Layout'; // Ensure you import the Layout component
import '../src/app/globals.css'; // Ensure Tailwind and other global styles are loaded
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { initMixpanel } from '../src/lib/mixpanelService'; // Import Mixpanel init function
import Head from 'next/router';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isMixpanelPage = router.pathname === '/mixpanel';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initMixpanel(); // Initialize Mixpanel once on app load
    }
  }, []);

  return (
    <Layout 
      linkText={isMixpanelPage ? "Back to Map" : "View Analytics"} 
      linkHref={isMixpanelPage ? "/" : "/mixpanel"}
    >
      <Head>
      {/* Check if the current route requires Mapbox styles */}
      {router.pathname.includes('/map') && ( 
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css"
          rel="stylesheet"
        />
      )}
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
