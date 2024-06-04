
import { PageHeaderWrapper } from "@/components/PageHeaderWrapper";
import { PermissionVerify } from "@/components/PermissionVerify";
import CreateOrUpdateData from "@/content/measurement_units/CreateOrUpdateData";
import ShowData from "@/content/measurement_units/ShowData";
import { MeasurementUnit } from "@/types/measurement_unit";
import { useState } from "react";


export default function MeasurementUnits() {

  const [editAttribute, setEditAttribute] = useState<MeasurementUnit | null>();

  const addEditAttribute= (user: MeasurementUnit | null): void => {
    setEditAttribute(() => user)
  }

  return (
    <>
      <PageHeaderWrapper name="Measurement Units">
        <CreateOrUpdateData editData={editAttribute} addEditBrand={addEditAttribute} />
      </PageHeaderWrapper>

      <div className="px-6 py-3 w-full min-h-fit">
        <PermissionVerify havePermission="index_measurement_unit">
          <ShowData addEditData={addEditAttribute} />
        </PermissionVerify>
      </div>
    </>
  )
}


