/* Server wrapper for TopNav that injects the server-rendered NavUser into the client shell */

import NavUser from '@/components/navigation/NavUser';
import TopNavClient from '@/components/navigation/TopNavClient';
import { fetchContentBlock } from '@/lib/content-service';

export default async function TopNav() {
  const hero = await fetchContentBlock('hero');
  const heroData = hero?.data as { webcamUrl?: string } | undefined;
  const webcamUrl = heroData?.webcamUrl;
  return <TopNavClient rightSlot={<NavUser />} webcamUrl={webcamUrl} />;
}


