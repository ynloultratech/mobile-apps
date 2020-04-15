import { useRouter } from 'next/router'
import Landing from './index';

const Merchant = () => {
  const router = useRouter()
  const { id } = router.query

  return <Landing onToggleDark={() => {}} onToggleDir={() => {}} merchantId={id} />
}

export default Merchant
