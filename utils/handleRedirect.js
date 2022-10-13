// Work around for modals not closing on redirects
import { useRouter } from "next/router"
const router = useRouter()
export const handleRedirect = (link, setState) =>{
  setState(false)
  router.push(link)
}