export const techDataMarkUp = `
<table class='techdata-table total-power'>
<caption>
<button class='techdata-table-caption-btn'>{placeholders.techDataTotalPower}</button>
<i class="techdata__caption-icon" data-icon="arrow_chevron_up" aria-hidden="true"></i>
</caption>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataEngineType}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.powerTrain.fuelType}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataPowerInKw}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.powerTrain.systemPower}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataTorqueInNm}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.powerTrain.systemMaxTorque}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataTransmission}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.powerTrain.gearBox}</p>
    </td>
 </tr>
 <tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataDrive}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.powerTrain.driveType}</p>
    </td>
</tr>
</table>

<table class='techdata-table twin-power'>
<caption>
<button class='techdata-table-caption-btn'>{placeholders.techDataTwinPower}</button>
<i class="techdata__caption-icon" data-icon="arrow_chevron_up" aria-hidden="true"></i>
</caption>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataCylinders}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.engine.cylinders}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataVolumneInCm}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.engine.technicalCapacity}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataNominalPowerInKw}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.engine.nominalPower}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataNominalSpeedInNm}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.engine.nominalTorque}</p>
    </td>
 </tr>
</table>

<table class='techdata-table electric-motor'>
<caption>
<button class='techdata-table-caption-btn'>{placeholders.techDataElectricMotor}</button>
<i class="techdata__caption-icon" data-icon="arrow_chevron_up" aria-hidden="true"></i>
</caption>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataNominalPowerElectricMotorKw}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.electric.systemPower}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataNominalTorqueInNm}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.electric.systemMaxTorque}</p>
    </td>
</tr>
</table>

<table class='techdata-table performance'>
<caption>
<button class='techdata-table-caption-btn'>{placeholders.techDataPerformance}</button>
<i class="techdata__caption-icon" data-icon="arrow_chevron_up" aria-hidden="true"></i>
</caption>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataAccelerationZeroToHundread}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.performance.acceleration}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataMaximumSpeedInKm}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.performance.topSpeed}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataMaximumSpeedInKmElectricMotor}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.performance.electricTopSpeed}</p>
    </td>
</tr>
</table>

<table class='techdata-table Consumption-Emissions'>
<caption>
<button class='techdata-table-caption-btn'>{placeholders.techDataConsumptionEmission}</button>
<i class="techdata__caption-icon" data-icon="arrow_chevron_up" aria-hidden="true"></i>
</caption>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataFuelConsumptionCombinedWltpUl}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.emissionsConsumptionWltp.consumptionWltpCombined}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataC02EmissionsCombinedWltpUgkm}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.emissionsConsumptionWltp.emissionsWltpCombined}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataEnergyConsumptionCombinedWltpInKwh}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.emissionsConsumptionWltp.consumptionWltpCombinedChargeSustaining}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataElectricRangeWltpInKm}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.emissionsConsumptionWltp.emissionsWltpCombined}</p>
    </td>
</tr>
</table>

<table class='techdata-table high-voltage-battery'>
<caption>
<button class='techdata-table-caption-btn'>{placeholders.techDataHighVoltageBatteryCharging}</button>
<i class="techdata__caption-icon" data-icon="arrow_chevron_up" aria-hidden="true"></i>
</caption>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataBatteryCapacityInKwh}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.charging.batteryCapacity}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataAdditionalRangeAfterMinOfCharge}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.charging.additionalRangeDC}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataMaximumChargingPowerAcDcInKw}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.charging.chargeACDC}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataChargingTimeAcHr}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.charging.charge_AC_0_100}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataChargingTimeDcInMin}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.charging.charge_DC_10_80}</p>
    </td>
</tr>
</table>
`;