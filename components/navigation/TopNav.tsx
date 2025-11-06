/* Server wrapper for TopNav that injects the server-rendered NavUser into the client shell */

import NavUser from '@/components/navigation/NavUser';
import TopNavClient from '@/components/navigation/TopNavClient';

export default async function TopNav() {
  return <TopNavClient rightSlot={<NavUser />} />;
}


