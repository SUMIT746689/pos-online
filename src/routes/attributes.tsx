
import { PageHeaderWrapper } from "@/components/PageHeaderWrapper";
import { PermissionVerify } from "@/components/PermissionVerify";
import CreateOrUpdateData from "@/content/attributes/CreateOrUpdateData";
import ShowData from "@/content/attributes/ShowData";
import { Attribute } from "@/types/attribute";
import { useState } from "react";


export default function Attributes() {

  const [editAttribute, setEditAttribute] = useState<Attribute | null>();

  const addEditAttribute= (user: Attribute | null): void => {
    setEditAttribute(() => user)
  }

  return (
    <>
      <PageHeaderWrapper name="Attribute">
        <CreateOrUpdateData editData={editAttribute} addEditBrand={addEditAttribute} />
      </PageHeaderWrapper>

      <div className="px-6 py-3 w-full min-h-fit">
        <PermissionVerify havePermission="index_attribute">
          <ShowData addEditData={addEditAttribute} />
        </PermissionVerify>
      </div>
    </>
  )
}


