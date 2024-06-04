import { useState } from "react";
import { PageHeaderWrapper } from "@/components/PageHeaderWrapper";
import CreateOrUpdateData from "@/content/suppliers/CreateOrUpdateData";
import ShowData from "@/content/suppliers/ShowData";
import { Supplier } from "@/types/supplier";
import { PermissionVerify } from "@/components/PermissionVerify";

const Suppliers = () => {
    const [editSupplier, setEditSupplier] = useState<Supplier | null>();

    const addEditSupplier = (user: Supplier | null): void => {
        setEditSupplier(() => user)
    }

    return (
        <>
            <PageHeaderWrapper name="Supplier">
                <CreateOrUpdateData editData={editSupplier} addEditSupplier={addEditSupplier} />
            </PageHeaderWrapper>
            <div className="px-6 py-3 w-full min-h-fit">
                <PermissionVerify havePermission="index_supplier">
                    <ShowData addEditData={addEditSupplier} />
                </PermissionVerify>
            </div>
        </>
    );
};

export default Suppliers;