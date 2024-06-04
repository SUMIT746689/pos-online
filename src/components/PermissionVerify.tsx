import { useAuthUserQuery } from "@/redux/services/auth"
import { FC } from "react";

interface PermissionVerifyInterface {
  havePermission: string;
  children: React.ReactElement;
}

export const PermissionVerify: FC<PermissionVerifyInterface> = ({ havePermission, children }) => {
  const { data } = useAuthUserQuery();
  const permissions: string[] | [] = data?.edges?.role?.edges?.permissions?.map((permission: { id: number, value: string }) => permission.value) || [];
 
  if (!permissions.includes(havePermission)) return <></>
  return (
    <>
      {children}
    </>
  )
}