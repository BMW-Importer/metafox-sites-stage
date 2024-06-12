// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './aem.js';

sampleRUM('cwv');

const event_tracking = {"event": {
    "event": "custom.link",
    "eventInfo": {
        "id": "XXXX",
        "category": {
            "primaryCategory": "other",
            "subCategory": "CTA",
            "linkName": "LinkName",
            "linkURL": "URL",
        },
        "block": {
            "blockInfo": {
                "blockName": "TextWithImage",
                "blockDetails": "TextWithImage",
            },
        }
    }
}}

export function pushCustomLinkAnalyticData(prop) {  
    const [analyticsLabel, buttonLink] = prop;
    event_tracking.event.eventInfo.category.EventLabel = analyticsLabel;
    event_tracking.event.eventInfo.category.primaryCategory = buttonLink;
    event_tracking.event.eventInfo.category.subCategory = buttonLink;

    // analyticsBlockName

    window.adobeDataLayer.push(event_tracking);
}