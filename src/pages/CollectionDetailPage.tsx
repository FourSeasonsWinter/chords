import { useParams } from "react-router-dom"

export default function CollectionDetailPage() {
  const { collectionId } = useParams<{ collectionId: string }>()
  
  return <></>
}