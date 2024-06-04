
import { PageHeaderWrapper } from "@/components/PageHeaderWrapper";
import { PermissionVerify } from "@/components/PermissionVerify";
import CreateOrUpdateData from "@/content/brands/CreateOrUpdateData";
import ShowData from "@/content/brands/ShowData";
import { Brand } from "@/types/brand";
import { useState } from "react";


export default function Brands() {

  const [editBrand, setEditBrand] = useState<Brand | null>();

  const addEditBrand = (user: Brand | null): void => {
    setEditBrand(() => user)
  }

  return (
    <>
      <PageHeaderWrapper name="Brands">
        <CreateOrUpdateData editData={editBrand} addEditBrand={addEditBrand} />
      </PageHeaderWrapper>

      <div className="px-6 py-3 w-full min-h-fit">
        <PermissionVerify havePermission="index_brand">
          <ShowData addEditData={addEditBrand} />
        </PermissionVerify>
      </div>
    </>
  )
}


