// import useEmployeeStore from "@/store/employee"
// import { useEffect, useState } from "react"

// const useHydration = () => {
//     const [hydrated, setHydrated] = useState(false)
  
//     useEffect(() => {
//       // Note: This is just in case you want to take into account manual rehydration.
//       // You can remove the following line if you don't need it.
//       const unsubHydrate = useEmployeeStore.persist.onHydrate(() => setHydrated(false))
  
//       const unsubFinishHydration = useEmployeeStore.persist.onFinishHydration(() => setHydrated(true))
  
//       setHydrated(useEmployeeStore.persist.hasHydrated())
  
//       return () => {
//         unsubHydrate()
//         unsubFinishHydration()
//       }
//     }, [])
  
//     return hydrated
//   }