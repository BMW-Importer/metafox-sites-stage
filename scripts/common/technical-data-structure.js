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


<table class='techdata-table dimenssion-weights'>
<caption>
<button class='techdata-table-caption-btn'>{placeholders.techDataDimensionsWeights}</button>
<i class="techdata__caption-icon" data-icon="arrow_chevron_up" aria-hidden="true"></i>
</caption>
<thead class="techdata-table-head">
    <tr class="techdata-table-head-tr">
        <td class="techdata-table-head-td">
        <div class="techdata-table-img-side"></div>
        <div class="techdata-table-img-measurements">
        <p class="techdata-table-img-side-text">{technicalData.weightMeasurements.length}&nbsp{placeholders.techDataMmText}</p>
        </div>
        </td>
    </tr>
    <tr class="techdata-table-head-tr">
        <td class="techdata-table-head-td">
        <div class="techdata-table-img-front"></div>
        <div class="techdata-table-img-measurements">
        <p class="techdata-table-img-front-text">{technicalData.weightMeasurements.width}&nbsp{placeholders.techDataMmText}</p>
        </div>
        </td>
    </tr>
    <tr class="techdata-table-head-tr">
        <td class="techdata-table-head-td">
        <div class="techdata-table-img-back"></div>
        <div class="techdata-table-img-measurements">
        <p class="techdata-table-img-back-text">{technicalData.weightMeasurements.height}&nbsp{placeholders.techDataMmText}</p>
        </div>
        </td>
    </tr>
</thead>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataLengthInMm}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.weightMeasurements.length}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataWidthInMm}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.weightMeasurements.width}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataHeightInMm}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.weightMeasurements.height}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataWidthIncludingMirrorsInMm}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.weightMeasurements.widthMirrors}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataWheelbaseInMm}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.weightMeasurements.wheelTurn}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataEmptyVehicleWeightInKg}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.weightMeasurements.weightNotLoaded}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataMaximumAllowedWeightInKg}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.weightMeasurements.weightMax}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataLoadCapacityInKg}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.weightMeasurements.permittedLoad}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataOptionallySuppliedTowing}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.weightMeasurements.trailerLoad}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataCapacityofTheLuggageSpaceUl}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.weightMeasurements.trunkCapacity}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataTheVolumeOfTheReservoirUl}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.}</p>
    </td>
</tr>
<tr class="techdata-table-tr" role="row">
    <td class="techdata-table-td label" role="rowheader">
    <p class="techdata-table-td-text label">{placeholders.techDataBmwWheelsAndTires}</p>
    </td>
    <td class="techdata-table-td value" role="rowheader">
    <p class="techdata-table-td-text value">{technicalData.}</p>
    </td>
</tr>
</table>
`;

export const techDataWdhResponsObject = `{"model":{"modelCode":"{responseJson.ModelCode}","brand":"","description":"","shortName":"","shortRangeName":"","modelRangeCode":"","modelRanges":[""],"seriesCode":"","series":[""],"seriesDescription":"","seriesDescriptions":[""],"hybridCode":"","fromPrice":0,"acceleration":"","trunkCapacity":0,"seats":0,"horsePower":0,"topSpeed":"","bodyTypeCode":"","marketingBodyTypeCode":"","posiSpec":{"cosyBrand":"","agCode":"","paint":"","fabric":"","options":""},"powerTrain":{"fuelType":"","systemPower":"","systemMaxTorque":"","gearBox":"","driveType":""},"effectDate":"","vehicles":[{"transmissionCode":"{responseJson.TransmissionType}","hybridCode":"","iD_LEIST_KONST":"","volt48":true,"technicalData":{"powerTrain":{"fuelType":"{responseJson.EngineType}","systemPower":"{responseJson.Power}","systemMaxTorque":"{responseJson.Torque}","gearBox":"{responseJson.Transmission}","driveType":"{responseJson.DriveType}"},"engine":{"cylinders":"","technicalCapacity":"","nominalPower":"{responseJson.NominalPower}","nominalTorque":""},"electric":{"systemPower":"-"},"performance":{"acceleration":"{responseJson.Acceleration}","topSpeed":"{responseJson.MaximumSpeed}","electricTopSpeed":""},"emissionsConsumptionWltp":{"consumptionWltpCombined":"{responseJson.EnergyConsumption}","consumptionWltpCombinedChargeSustaining":"","emissionsWltpCombined":"","electricConsumption":"","electricRangeWltpCombined":"{responseJson.ElectricRange}","efficiencyCategoryMinChargeSustaining":"","efficiencyCategoryMaxChargeSustaining":"","noiseDriving":"","noiseStationary":""},"charging":{"batteryCapacity":"{responseJson.BatteryCapacity}","additionalRangeDC":"","chargeACDC":"{responseJson.MaximumChargingPower}","chargeAC":"{responseJson.ChargingTimeAC}","charge_AC_0_100":"","chargeDC":"{responseJson.ChargingTimeDC}","charge_DC_10_80":""},"weightMeasurements":{"length":"{responseJson.Length}","width":"{responseJson.Width}","height":"{responseJson.Height}","widthMirrors":"","wheelTurn":"{responseJson.Wheelbase}","weightNotLoaded":"{responseJson.EmptyVehicleWeight}","weightMax":"","permittedLoad":"","trailerLoad":"{responseJson.TowingHook}","trunkCapacity":"{responseJson.LuggageCapacity}","tankCapacity":""}},"footnotes":{},"footnotesData":{"overboostMax":"","overboostKW":""}}]}}`;
