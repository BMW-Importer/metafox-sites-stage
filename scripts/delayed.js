// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './aem.js';
import { multiContentGalFunAfterPageLoad } from '../blocks/multicontent-gallery/multicontent-gallery.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');
multiContentGalFunAfterPageLoad();
