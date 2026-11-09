import terrace from '../assets/Terrace-Garden.webp';
import malhar from '../assets/tehe.webp';
import malharDetail from '../assets/fgnrfg.webp';
import bhive from '../assets/ethbe.webp';
import bhiveWall from '../assets/rerege.webp';
import skylark from '../assets/rynmyfh.webp';
import skylarkDetail from '../assets/tgnzb.webp';
import iampl from '../assets/tnbet.webp';
import care from '../assets/anz-service-fimg4.webp';
import softscape from '../assets/softscape.webp';
import villa from '../assets/Villa-landscaping.webp';
import vertical from '../assets/anz-service-fimg8.webp';
import rental from '../assets/office-plant-rental-banner.webp';
import pergola from '../assets/PERGOLA-BANNER-SERVIE-BANNER-anz.webp';
import projectMalhar from '../assets/retouched/goodearth-malhar.webp';
import projectBhive from '../assets/retouched/bhive-premium.webp';
import projectSkylark from '../assets/retouched/skylark-mansions.webp';
import projectIampl from '../assets/retouched/iampl.webp';
import hero from '../assets/retouched/terrace-hero.webp';

export const imagery = { hero, terrace, malhar, malharDetail, bhive, bhiveWall, skylark, skylarkDetail, iampl, care, softscape, villa, vertical, rental, pergola };
export const projects = [
  { slug: 'goodearth-malhar', name: 'GoodEarth Malhar', category: 'Residential', location: 'Medley, Bengaluru', image: projectMalhar, gallery: [projectMalhar, malhar, malharDetail], description: 'A planted outdoor retreat at GoodEarth Malhar. Greenery, timber and sheltered seating bring nature into everyday living.' },
  { slug: 'bhive-premium', name: 'BHIVE Premium', category: 'Commercial', location: 'HSR Campus, Bengaluru', image: projectBhive, gallery: [projectBhive, bhive, bhiveWall], description: 'Planting for a working environment at BHIVE Premium’s HSR Campus. Interior planters and vertical greenery create a softer setting for the workday.' },
  { slug: 'skylark-mansions', name: 'Skylark Mansions', category: 'Residential', location: 'Bengaluru', image: projectSkylark, gallery: [projectSkylark, skylark, skylarkDetail], description: 'Vertical planting and garden spaces at Skylark Mansions. A close look at ANZ’s planting and on site execution.' },
  { slug: 'iampl', name: 'IAMPL', category: 'Commercial', location: 'SEZ Tech Park, Bengaluru', image: projectIampl, gallery: [projectIampl, iampl], description: 'Landscape execution for IAMPL. Planting along the building edge brings a green layer to this commercial setting.' },
];
export const services = [
  { slug: 'commercial-landscaping', title: 'Commercial landscapes', label: '01', image: bhive, short: 'Greener places to work, welcome and connect.', description: 'Landscape design and execution for offices, corporate campuses, hospitality spaces and developments. Planting, circulation and outdoor areas considered together.', items: ['Corporate & office landscapes', 'Hospitality & developments', 'Softscape & hardscape', 'Landscape irrigation'] },
  { slug: 'villa-landscaping', title: 'Residential gardens', label: '02', image: villa, short: 'Your own space to slow down and step outside.', description: 'Gardens shaped around the way you live. From villa landscapes and private gardens to terraces, ANZ brings planting and practical outdoor spaces together.', items: ['Villa landscaping', 'Terrace gardens', 'Pergolas & fabrication', 'Water fountains & ponds'] },
  { slug: 'vertical-garden', title: 'Plantscaping & living walls', label: '03', image: vertical, short: 'A living layer for walls, interiors and everyday spaces.', description: 'Vertical gardens, moss walls and interior planting for spaces large and small. Add greenery to your interiors with ANZ’s office plant rental and planter options.', items: ['Vertical gardens', 'Moss walls', 'Office plant rental', 'FRP planters'] },
  { slug: 'garden-maintenance', title: 'Garden care & maintenance', label: '04', image: care, short: 'Thoughtful care that keeps your landscape thriving.', description: 'Regular garden maintenance, pruning and planting care to keep landscapes in good condition. Discuss your garden and its ongoing needs with our team.', items: ['Routine garden maintenance', 'Pruning & upkeep', 'Plant care', 'Irrigation care'] },
];
export const processSteps = [
  { title: 'Start with your space.', body: 'Tell us what you have in mind. We discuss your site, how it will be used, and the requirements and budget that will guide the landscape.', image: malhar },
  { title: 'Bring the details together.', body: 'Explore the planting, materials and landscape elements that suit your space. We work through the scope with you before moving into execution.', image: softscape },
  { title: 'Build it. Then help it grow.', body: 'Our on site teams bring the landscape to life. For ongoing support, talk to us about garden maintenance and plant care.', image: care },
];
export const faqs = [
  { question: 'Do you work on both homes and commercial spaces?', answer: 'Yes. We work on gardens, villas, offices, campuses, hotels and developments.' },
  { question: 'Can you handle design and execution?', answer: 'Yes. We handle design, planting, hardscape, pergolas, irrigation and water features.' },
  { question: 'Can you help maintain an existing garden?', answer: 'Yes. We provide regular maintenance and plant care for existing gardens.' },
  { question: 'How do I start a project with ANZ?', answer: 'Send an enquiry with your location and requirements. Our team will get in touch.' },
];
