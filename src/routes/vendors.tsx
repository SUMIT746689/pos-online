import { useState } from "react";
import { PageHeaderWrapper } from "@/components/PageHeaderWrapper";
import CreateOrUpdateData from "@/content/vendors/CreateOrUpdateData";
import ShowData from "@/content/vendors/ShowData";
import { Vendor } from "@/types/vendor";
import { PermissionVerify } from "@/components/PermissionVerify";

const Vendors = () => {
    const [editVendor, setEditVendor] = useState<Vendor | null>();

    const addEditVendor = (user: Vendor | null): void => {
        setEditVendor(() => user)
    }

    return (
        <>
            <PageHeaderWrapper name="Vendor">
                <CreateOrUpdateData editData={editVendor} addEditVendor={addEditVendor} />
            </PageHeaderWrapper>
            <div className="px-6 py-3 w-full min-h-fit">
                <PermissionVerify havePermission="index_vendor">
                    <ShowData addEditData={addEditVendor} />
                </PermissionVerify>
            </div>
        </>
    );
};

export default Vendors;