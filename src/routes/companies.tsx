
import { PageHeaderWrapper } from "@/components/PageHeaderWrapper";
import { PermissionVerify } from "@/components/PermissionVerify";
import CreateOrUpdateData from "@/content/companies/CreateOrUpdateData";
import ShowData from "@/content/companies/ShowData";
import { Company } from "@/types/company";
import { useState } from "react";


export default function Companies() {

  const [editCompany, setEditCompany] = useState<Company | null>();

  const addEditCompany = (user: Company | null): void => {
    setEditCompany(() => user)
  }

  return (
    <>
      <PageHeaderWrapper name="Companies">
        <CreateOrUpdateData editData={editCompany} addEditCompany={addEditCompany} />
      </PageHeaderWrapper>

      <div className="px-6 py-3 w-full min-h-fit">
        <PermissionVerify havePermission="index_company">
          <ShowData addEditData={addEditCompany} />
        </PermissionVerify>
      </div>
    </>
  )
}


