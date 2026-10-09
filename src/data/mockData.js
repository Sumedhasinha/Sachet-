// Mock Data for SACHET | सचेत Emergency Response & Incident Management System

export const SACHET_CITY_CENTER = [23.2599, 77.4126]; // Bhopal Metro Sector

export const INITIAL_INCIDENTS = [
  {
    id: 'INC-4721',
    type: 'Vehicle Collision',
    category: 'traffic',
    district: 'MP Nagar Zone 1',
    severity: 'critical',
    status: 'responding', // reported, verified, dispatched, responding, on_scene, resolved
    reportedTime: '21:42',
    lastUpdated: '21:47',
    estimatedResolution: '22:15',
    coordinates: [23.2325, 77.4320],
    address: 'Jyoti Talkies Intersection, Main Hoshangabad Road',
    assignedUnits: ['AMB-204', 'PCR-118', 'FIRE-031'],
    eta: '04:32',
    casualties: '3 injured individuals, urgent medical assistance needed',
    description: 'Major collision between passenger bus and commercial transport at primary intersection. Fuel spillage obstructing two southbound lanes.',
    timeline: [
      { time: '21:42', message: 'Incident reported via Emergency Response Centre 112' },
      { time: '21:43', message: 'Traffic Control Room verified coordinates via CCTV cameras' },
      { time: '21:44', message: 'Police PCR Unit PCR-118 assigned and routed' },
      { time: '21:45', message: '108 Ambulance AMB-204 & Fire Rescue Tender FIRE-031 dispatched' },
      { time: '21:47', message: 'Police unit PCR-118 arrived on scene, initial cordon established' }
    ],
    operationalSummary: {
      headline: 'High-severity vehicle collision with fuel leakage at primary intersection.',
      body: 'Police PCR-118 has arrived at the scene. Two 108 ambulance units are responding. Roadway is obstructed across two southbound lanes. Traffic diversion is in effect towards Chetak Bridge.',
      riskLevel: 'HIGH',
      recommendedActions: [
        'Maintain traffic diversion at Jyoti Talkies and Board Office square',
        'Dispatch additional 108 medical transport (AMB-208) for secondary triage',
        'Alert Hamidia Hospital Trauma Centre for inbound emergency casualties',
        'Deploy Municipal Corporation cleaning unit for fuel spill neutralization'
      ]
    }
  },
  {
    id: 'INC-4719',
    type: 'Commercial Building Fire',
    category: 'fire',
    district: 'Govindpura Industrial Area',
    severity: 'high',
    status: 'on_scene',
    reportedTime: '21:38',
    lastUpdated: '21:46',
    estimatedResolution: '23:00',
    coordinates: [23.2640, 77.4580],
    address: 'Sector B, Govindpura Industrial Estate',
    assignedUnits: ['FIRE-102', 'FIRE-088', 'PCR-205', 'AMB-112'],
    eta: '00:00 (On Scene)',
    casualties: 'No civilian casualties reported; evacuation in progress',
    description: 'Active commercial fire in electrical machinery warehouse. Dense smoke venting from roof section. Foam tender deployed.',
    timeline: [
      { time: '21:38', message: 'Automated thermal detector alert received at District Fire Station' },
      { time: '21:39', message: 'Industrial security staff confirmed active blaze' },
      { time: '21:40', message: 'Fire Tenders FIRE-102 and FIRE-088 dispatched with hydraulic platform' },
      { time: '21:43', message: 'Units arrived on scene. Defensive water curtain initiated' },
      { time: '21:46', message: 'Evacuation of adjacent warehouses initiated' }
    ],
    operationalSummary: {
      headline: 'Commercial electrical manufacturing warehouse structural fire.',
      body: 'Multiple fire engines deployed. Defensive operations underway to prevent spread to chemical storage shed. Wind speed 12 km/h North-West.',
      riskLevel: 'HIGH',
      recommendedActions: [
        'Establish 300-metre safety perimeter downwind',
        'Ensure power supply to transformer line Sector B remains isolated',
        'Notify Pollution Control Board for particulate air sampling'
      ]
    }
  },
  {
    id: 'INC-4717',
    type: 'Acute Medical Emergency',
    category: 'medical',
    district: 'Airport Road',
    severity: 'medium',
    status: 'responding',
    reportedTime: '21:34',
    lastUpdated: '21:43',
    estimatedResolution: '22:10',
    coordinates: [23.2875, 77.3620],
    address: 'Raja Bhoj Airport Departure Concourse, Gate 2',
    assignedUnits: ['AMB-112', 'PCR-108'],
    eta: '02:45',
    casualties: '1 passenger with acute respiratory and cardiac distress',
    description: 'Passenger collapsed near terminal security. Airport medical staff deployed automated external defibrillator.',
    timeline: [
      { time: '21:34', message: 'Airport Operations Control Room alerted Emergency Dispatch' },
      { time: '21:36', message: 'First aid administered by CISF quick reaction team' },
      { time: '21:37', message: 'Paramedic Ambulance AMB-112 en route with priority beacon' },
      { time: '21:43', message: 'Paramedics on site, patient vitals stabilized' }
    ],
    operationalSummary: {
      headline: 'Airport departure terminal cardiac emergency.',
      body: 'Passenger revived by airport medical team. 108 Ambulance AMB-112 is stabilizing patient for transfer to AIIMS Bhopal.',
      riskLevel: 'MEDIUM',
      recommendedActions: [
        'Coordinate airport VIP gate exit for emergency ambulance clearance',
        'Reserve cardiac ICU bed at AIIMS Bhopal Emergency Ward'
      ]
    }
  },
  {
    id: 'INC-4715',
    type: 'Hazardous Chemical Leak',
    category: 'hazmat',
    district: 'Berasia Road Industrial Hub',
    severity: 'critical',
    status: 'dispatched',
    reportedTime: '21:28',
    lastUpdated: '21:44',
    estimatedResolution: '01:30',
    coordinates: [23.2950, 77.4100],
    address: 'Depot Gate 4, Berasia Industrial Corridor',
    assignedUnits: ['HAZ-04', 'FIRE-019', 'PCR-330'],
    eta: '05:15',
    casualties: '2 workers exposed to vapor, decontamination initiated',
    description: 'Rupture in 1000-litre industrial chemical containment tank during transfer. Neutralizing vapor perimeter established.',
    timeline: [
      { time: '21:28', message: 'Factory safety warden called State Emergency Helpline' },
      { time: '21:30', message: 'District HazMat Quick Response Unit HAZ-04 activated' },
      { time: '21:35', message: 'Police unit PCR-330 establishing traffic roadblock on Berasia Road' }
    ],
    operationalSummary: {
      headline: 'Industrial solvent breach on freight platform.',
      body: 'Vapor perimeter expanding across 150 metres. Traffic diversions in place. Decontamination shower vehicle mobilised.',
      riskLevel: 'CRITICAL',
      recommendedActions: [
        'Close Berasia Road between Gates 2 and 6',
        'Issue precautionary stay-indoors advisory for adjacent colonies',
        'Coordinate with National Disaster Response Force (NDRF) liaison officer'
      ]
    }
  },
  {
    id: 'INC-4712',
    type: 'Urban Waterlogging & Flood Alert',
    category: 'natural',
    district: 'Kolar Road Basin',
    severity: 'high',
    status: 'responding',
    reportedTime: '21:20',
    lastUpdated: '21:45',
    estimatedResolution: '03:00',
    coordinates: [23.1890, 77.4190],
    address: 'Lalita Nagar Underpass, Kolar Road',
    assignedUnits: ['RES-08', 'PCR-104', 'FIRE-044'],
    eta: '03:10',
    casualties: '2 auto-rickshaws stranded in drainage water, occupants rescued',
    description: 'Severe storm runoff overflow. Water depth exceeding 3 feet in roadway depression. High-capacity dewatering pump dispatched.',
    timeline: [
      { time: '21:20', message: 'Commuter emergency calls logged at Control Room' },
      { time: '21:23', message: 'Municipal drainage response unit RES-08 mobilized' },
      { time: '21:30', message: 'Traffic police vehicle blocking underpass ramps' }
    ],
    operationalSummary: {
      headline: 'Urban flash waterlogging submerging low-lying underpass.',
      body: 'Occupants safely evacuated to elevated road. Municipal Corporation heavy suction pumps arriving to drain culvert.',
      riskLevel: 'HIGH',
      recommendedActions: [
        'Complete dewatering of underpass before morning commuter peak',
        'Disconnect municipal power supply to submerged street poles',
        'Redirect city bus routes via Sarvdharm Sector'
      ]
    }
  },
  {
    id: 'INC-4708',
    type: 'LPG Gas Pipeline Fracture',
    category: 'fire',
    district: 'Arera Hills Sector',
    severity: 'high',
    status: 'verified',
    reportedTime: '21:15',
    lastUpdated: '21:40',
    estimatedResolution: '23:45',
    coordinates: [23.2380, 77.4180],
    address: 'Near Old Vidhan Sabha Road, Arera Hills',
    assignedUnits: ['FIRE-044', 'PCR-092'],
    eta: '06:20',
    casualties: 'No casualties; strong odor reported by residents',
    description: 'City gas distribution pipe rupture during municipal telecommunications trenching.',
    timeline: [
      { time: '21:15', message: 'Public odor complaints received at Helpline 112' },
      { time: '21:22', message: 'Gas distribution utility confirmed pressure anomaly' },
      { time: '21:35', message: 'Fire Tender 044 dispatched for vapor screening' }
    ],
    operationalSummary: {
      headline: 'City gas utility pipeline puncture during civic digging.',
      body: 'Emergency pipeline valve shutoff crews en route. Precautionary evacuation of nearby government quarters initiated.',
      riskLevel: 'HIGH',
      recommendedActions: [
        'Enforce strict no-smoking / no-ignition zone within 250 metres',
        'Deploy public address vehicles for neighborhood safety announcements',
        'Coordinate with City Gas emergency repair division'
      ]
    }
  },
  {
    id: 'INC-4705',
    type: 'Multi-Vehicle Highway Collision',
    category: 'traffic',
    district: 'Bhopal Bypass Highway',
    severity: 'critical',
    status: 'on_scene',
    reportedTime: '21:05',
    lastUpdated: '21:48',
    estimatedResolution: '23:30',
    coordinates: [23.3100, 77.4600],
    address: 'Bypass Km 14, Sukhi Sewaniya Cross',
    assignedUnits: ['PCR-401', 'AMB-309', 'AMB-310', 'FIRE-012'],
    eta: '00:00 (On Scene)',
    casualties: '4 injured passengers, 1 trapped in cabin',
    description: 'Commercial trailer overturned across highway lanes resulting in collision with three smaller vehicles.',
    timeline: [
      { time: '21:05', message: 'Highway surveillance camera logged vehicle overturn' },
      { time: '21:07', message: 'Disaster response protocol Level 2 activated' },
      { time: '21:15', message: 'Hydraulic cutting tools deployed for driver extraction' },
      { time: '21:40', message: 'Two victims transferred to Hamidia Hospital Emergency' }
    ],
    operationalSummary: {
      headline: 'Major bypass highway blockage and passenger extrication.',
      body: 'Highway Patrol PCR-401 diverting traffic via Karond Square. Injured transported to Hamidia Medical College.',
      riskLevel: 'CRITICAL',
      recommendedActions: [
        'Keep highway recovery crane on site for quick clearing',
        'Display detour advisory on smart city electronic message signs',
        'Monitor ICU status for critically injured patient at Hamidia'
      ]
    }
  },
  {
    id: 'INC-4701',
    type: 'Electrical Substation Tripping',
    category: 'other',
    district: 'Habibganj Sector',
    severity: 'medium',
    status: 'on_scene',
    reportedTime: '20:52',
    lastUpdated: '21:30',
    estimatedResolution: '22:40',
    coordinates: [23.2180, 77.4410],
    address: 'Substation 33kV, Habibganj Railway Colony',
    assignedUnits: ['PCR-115', 'FIRE-055'],
    eta: '00:00 (On Scene)',
    casualties: 'None',
    description: 'Transformer spark and tripping resulting in power outage across 3 civil sectors.',
    timeline: [
      { time: '20:52', message: 'Power distribution company logged telemetry fault' },
      { time: '20:58', message: 'Fire Tender 055 arrived on site to monitor smoke' },
      { time: '21:10', message: 'Maintenance engineers isolated damaged feeder line' }
    ],
    operationalSummary: {
      headline: 'Substation transformer failure causing localized power cut.',
      body: 'Fire threat averted. Traffic signals operating on battery backups at key junctions. Backup power being switched on.',
      riskLevel: 'MEDIUM',
      recommendedActions: [
        'Ensure hospital backup diesel generators are operational in Habibganj',
        'Deploy traffic wardens to Mansarovar intersection'
      ]
    }
  },
  {
    id: 'INC-4698',
    type: 'Pedestrian Road Incident',
    category: 'traffic',
    district: 'New Market / TT Nagar',
    severity: 'medium',
    status: 'resolved',
    reportedTime: '20:41',
    lastUpdated: '21:35',
    estimatedResolution: '21:35',
    coordinates: [23.2350, 77.3990],
    address: 'Roshanpura Square, TT Nagar',
    assignedUnits: ['AMB-220', 'PCR-108'],
    eta: 'Resolved',
    casualties: '1 pedestrian with ankle fracture; stable',
    description: 'Minor traffic accident at crosswalk. Individual treated by 108 EMS and admitted to JP District Hospital.',
    timeline: [
      { time: '20:41', message: 'Incident reported by traffic auxiliary staff' },
      { time: '20:48', message: '108 Paramedic unit arrived on site' },
      { time: '21:15', message: 'Individual transported to hospital' },
      { time: '21:35', message: 'Scene cleared and incident ticket closed' }
    ],
    operationalSummary: {
      headline: 'Pedestrian road incident successfully resolved.',
      body: 'Prompt medical transport provided. Normal traffic movement restored at Roshanpura Square.',
      riskLevel: 'LOW',
      recommendedActions: ['Close incident log in registry']
    }
  },
  {
    id: 'INC-4694',
    type: 'Commercial Silent Alarm Trigger',
    category: 'crime',
    district: 'New Market Commercial Hub',
    severity: 'low',
    status: 'resolved',
    reportedTime: '20:30',
    lastUpdated: '21:10',
    estimatedResolution: '21:10',
    coordinates: [23.2320, 77.4020],
    address: 'State Cooperative Bank Building, Malviya Nagar',
    assignedUnits: ['PCR-214'],
    eta: 'Resolved',
    casualties: 'None',
    description: 'Vault security sensor triggered due to sensor battery replacement. Verified as false alarm.',
    timeline: [
      { time: '20:30', message: 'Automated bank sensor signal received at Police Control Room' },
      { time: '20:34', message: 'Police unit PCR-214 dispatched' },
      { time: '20:42', message: 'Officers verified maintenance activity with bank manager' },
      { time: '21:10', message: 'Incident verified and closed' }
    ],
    operationalSummary: {
      headline: 'Routine false alarm during hardware sensor maintenance.',
      body: 'No security breach. Bank branch manager signed incident verification form.',
      riskLevel: 'LOW',
      recommendedActions: ['Record routine false trigger in police register']
    }
  }
];

export const INITIAL_UNITS = [
  // 108 Ambulances / Medical Units
  { id: 'AMB-204', type: 'ambulance', category: '108 EMS Medical', name: '108 Paramedic Unit 204', status: 'en_route', location: 'MP Nagar Zone 1', eta: '03:21', assignedTo: 'INC-4721', coordinates: [23.2340, 77.4300], battery: 94, crew: '2 EMT Paramedics' },
  { id: 'AMB-112', type: 'ambulance', category: '108 EMS Medical', name: '108 ALS Ambulance 112', status: 'responding', location: 'Airport Road', eta: '02:45', assignedTo: 'INC-4717', coordinates: [23.2850, 77.3680], battery: 88, crew: '1 Doctor, 1 EMT' },
  { id: 'AMB-309', type: 'ambulance', category: '108 EMS Medical', name: '108 Trauma Unit 309', status: 'on_scene', location: 'Bhopal Bypass', eta: '00:00', assignedTo: 'INC-4705', coordinates: [23.3080, 77.4620], battery: 78, crew: '2 Paramedics' },
  { id: 'AMB-310', type: 'ambulance', category: '108 EMS Medical', name: '108 Emergency Unit 310', status: 'on_scene', location: 'Bhopal Bypass', eta: '00:00', assignedTo: 'INC-4705', coordinates: [23.3110, 77.4580], battery: 82, crew: '2 EMTs' },
  { id: 'AMB-220', type: 'ambulance', category: '108 EMS Medical', name: '108 Rapid Unit 220', status: 'available', location: 'TT Nagar Hospital Bay', eta: '-', assignedTo: null, coordinates: [23.2360, 77.3970], battery: 100, crew: '2 Paramedics' },
  { id: 'AMB-101', type: 'ambulance', category: '108 EMS Medical', name: '108 ALS Ambulance 101', status: 'available', location: 'AIIMS Emergency Bay', eta: '-', assignedTo: null, coordinates: [23.2080, 77.4590], battery: 96, crew: '2 Paramedics' },
  { id: 'AMB-105', type: 'ambulance', category: '108 EMS Medical', name: '108 Basic Ambulance 105', status: 'available', location: 'Hamidia Hospital Station', eta: '-', assignedTo: null, coordinates: [23.2620, 77.3920], battery: 92, crew: '2 EMTs' },
  { id: 'AMB-208', type: 'ambulance', category: '108 EMS Medical', name: '108 Paramedic Unit 208', status: 'available', location: 'JP District Hospital', eta: '-', assignedTo: null, coordinates: [23.2280, 77.4100], battery: 89, crew: '2 Paramedics' },
  { id: 'AMB-404', type: 'ambulance', category: '108 EMS Medical', name: '108 Unit 404 (Reserve)', status: 'maintenance', location: 'Central Fleet Workshop', eta: '-', assignedTo: null, coordinates: [23.2500, 77.4400], battery: 45, crew: 'Under Scheduled Service' },

  // Police Patrol Units (PCR)
  { id: 'PCR-118', type: 'police', category: 'Police Patrol', name: 'Police PCR Van 118', status: 'on_scene', location: 'MP Nagar Zone 1', eta: '00:00', assignedTo: 'INC-4721', coordinates: [23.2330, 77.4315], battery: 85, crew: '3 Police Officers' },
  { id: 'PCR-205', type: 'police', category: 'Police Patrol', name: 'Govindpura Sector Van 205', status: 'on_scene', location: 'Govindpura Industrial', eta: '00:00', assignedTo: 'INC-4719', coordinates: [23.2645, 77.4570], battery: 91, crew: '2 Police Officers' },
  { id: 'PCR-330', type: 'police', category: 'Police Patrol', name: 'Highway Patrol PCR 330', status: 'en_route', location: 'Berasia Road', eta: '04:10', assignedTo: 'INC-4715', coordinates: [23.2920, 77.4120], battery: 80, crew: '2 Police Officers' },
  { id: 'PCR-104', type: 'police', category: 'Police Patrol', name: 'Kolar Sector PCR 104', status: 'responding', location: 'Kolar Road', eta: '02:30', assignedTo: 'INC-4712', coordinates: [23.1910, 77.4170], battery: 87, crew: '2 Police Officers' },
  { id: 'PCR-401', type: 'police', category: 'Police Patrol', name: 'Bypass Traffic PCR 401', status: 'on_scene', location: 'Bhopal Bypass Km 14', eta: '00:00', assignedTo: 'INC-4705', coordinates: [23.3090, 77.4610], battery: 79, crew: '3 Officers' },
  { id: 'PCR-101', type: 'police', category: 'Police Patrol', name: 'Control Room PCR 101', status: 'available', location: 'Police HQ Control Room', eta: '-', assignedTo: null, coordinates: [23.2420, 77.4150], battery: 95, crew: '2 Officers' },
  { id: 'PCR-115', type: 'police', category: 'Police Patrol', name: 'Habibganj Police PCR 115', status: 'available', location: 'Habibganj Station', eta: '-', assignedTo: null, coordinates: [23.2190, 77.4390], battery: 90, crew: '2 Officers' },
  { id: 'PCR-092', type: 'police', category: 'Police Patrol', name: 'Arera Police Patrol 092', status: 'available', location: 'Arera Hills Outpost', eta: '-', assignedTo: null, coordinates: [23.2370, 77.4190], battery: 93, crew: '2 Officers' },
  { id: 'PCR-214', type: 'police', category: 'Police Patrol', name: 'TT Nagar Patrol PCR 214', status: 'available', location: 'TT Nagar Station', eta: '-', assignedTo: null, coordinates: [23.2340, 77.4010], battery: 86, crew: '2 Officers' },

  // Fire & Rescue Services
  { id: 'FIRE-031', type: 'fire', category: 'Fire & Rescue', name: 'Water Tender FIRE-031', status: 'en_route', location: 'MP Nagar Sector', eta: '05:42', assignedTo: 'INC-4721', coordinates: [23.2355, 77.4280], battery: 97, crew: '5 Firefighters' },
  { id: 'FIRE-102', type: 'fire', category: 'Fire & Rescue', name: 'Hydraulic Platform 102', status: 'on_scene', location: 'Govindpura Sector', eta: '00:00', assignedTo: 'INC-4719', coordinates: [23.2635, 77.4585], battery: 84, crew: '4 Firefighters' },
  { id: 'FIRE-088', type: 'fire', category: 'Fire & Rescue', name: 'Foam Tender FIRE-088', status: 'on_scene', location: 'Govindpura Sector', eta: '00:00', assignedTo: 'INC-4719', coordinates: [23.2642, 77.4578], battery: 86, crew: '4 Firefighters' },
  { id: 'HAZ-04', type: 'fire', category: 'HazMat Rescue', name: 'HazMat Specialist Van 04', status: 'en_route', location: 'Berasia Road', eta: '05:15', assignedTo: 'INC-4715', coordinates: [23.2940, 77.4110], battery: 92, crew: '4 HazMat Specialists' },
  { id: 'FIRE-019', type: 'fire', category: 'Fire & Rescue', name: 'Water Bowser FIRE-019', status: 'en_route', location: 'Berasia Road Sector', eta: '05:40', assignedTo: 'INC-4715', coordinates: [23.2960, 77.4090], battery: 89, crew: '4 Firefighters' },
  { id: 'RES-08', type: 'fire', category: 'Disaster Rescue', name: 'Drainage Rescue Van RES-08', status: 'en_route', location: 'Kolar Road Drainage', eta: '03:10', assignedTo: 'INC-4712', coordinates: [23.1905, 77.4180], battery: 91, crew: '3 Rescue Technicians' },
  { id: 'FIRE-044', type: 'fire', category: 'Fire & Rescue', name: 'Water Tender FIRE-044', status: 'available', location: 'Arera Hills Station', eta: '-', assignedTo: null, coordinates: [23.2390, 77.4170], battery: 98, crew: '5 Firefighters' },
  { id: 'FIRE-012', type: 'fire', category: 'Fire & Rescue', name: 'Heavy Rescue Tender 012', status: 'on_scene', location: 'Bhopal Bypass Highway', eta: '00:00', assignedTo: 'INC-4705', coordinates: [23.3105, 77.4595], battery: 82, crew: '4 Rescue Specialists' },
  { id: 'FIRE-007', type: 'fire', category: 'Fire & Rescue', name: 'City Central Tender 007', status: 'available', location: 'Pul Bogda Fire HQ', eta: '-', assignedTo: null, coordinates: [23.2550, 77.4250], battery: 95, crew: '5 Firefighters' },
  { id: 'FIRE-018', type: 'fire', category: 'Fire & Rescue', name: 'Ladder Tender 018', status: 'maintenance', location: 'Municipal Workshop', eta: '-', assignedTo: null, coordinates: [23.2480, 77.4350], battery: 30, crew: 'Under Maintenance' }
];

export const HOSPITALS = [
  { id: 'HOSP-1', name: 'AIIMS Bhopal Trauma Center', address: 'Saket Nagar, AIIMS Campus', bedsAvailable: 28, totalBeds: 250, icuStatus: 'Normal (72%)', coordinates: [23.2085, 77.4595], phone: '(0755) 267-2301' },
  { id: 'HOSP-2', name: 'Hamidia Government Medical Hospital', address: 'Royal Market, Sultania Road', bedsAvailable: 14, totalBeds: 350, icuStatus: 'High (89%)', coordinates: [23.2625, 77.3915], phone: '(0755) 254-0222' },
  { id: 'HOSP-3', name: 'JP District Civil Hospital', address: 'Tulsi Nagar, Link Road 1', bedsAvailable: 32, totalBeds: 180, icuStatus: 'Normal (58%)', coordinates: [23.2275, 77.4095], phone: '(0755) 255-6110' },
  { id: 'HOSP-4', name: 'Chirayu Health City Medical Center', address: 'Bhopal-Indore Highway, Bairagarh', bedsAvailable: 45, totalBeds: 400, icuStatus: 'Normal (60%)', coordinates: [23.2840, 77.3450], phone: '(0755) 270-0700' },
  { id: 'HOSP-5', name: 'Bansal Super Speciality Hospital', address: 'Shahpura, Chunabhatti Road', bedsAvailable: 18, totalBeds: 150, icuStatus: 'Normal (68%)', coordinates: [23.1950, 77.4280], phone: '(0755) 408-6000' },
  { id: 'HOSP-6', name: 'Bhopal Memorial Hospital (BMHRC)', address: 'Karond Bypass Road', bedsAvailable: 22, totalBeds: 200, icuStatus: 'Normal (65%)', coordinates: [23.2980, 77.4200], phone: '(0755) 274-0300' }
];

export const SHELTERS = [
  { id: 'SHELTER-1', name: 'Red Cross Disaster Relief Center', capacity: 500, occupied: 142, coordinates: [23.2380, 77.4020], status: 'Open' },
  { id: 'SHELTER-2', name: 'Govindpura Community Hall Shelter', capacity: 350, occupied: 85, coordinates: [23.2620, 77.4550], status: 'Open' },
  { id: 'SHELTER-3', name: 'TT Nagar Stadium Emergency Center', capacity: 800, occupied: 190, coordinates: [23.2310, 77.3950], status: 'Open' },
  { id: 'SHELTER-4', name: 'Kolar Municipal Community Complex', capacity: 400, occupied: 215, coordinates: [23.1870, 77.4210], status: 'High Occupancy' },
  { id: 'SHELTER-5', name: 'Karond Civil Defense Relief Post', capacity: 300, occupied: 60, coordinates: [23.2920, 77.4150], status: 'Open' }
];

export const INITIAL_ALERTS = [
  {
    id: 'ALT-901',
    priority: 'critical',
    title: 'Flash Flood & Urban Waterlogging Advisory',
    description: 'Heavy precipitation forecast across Kolar and Upper Lake catchment basins. Water level monitoring active.',
    location: 'Kolar & River Drainage Corridors',
    timestamp: '12 minutes ago',
    active: true,
    read: false,
    issuer: 'State Disaster Management Authority / IMD'
  },
  {
    id: 'ALT-902',
    priority: 'critical',
    title: 'Hazardous Chemical Containment Notice',
    description: 'Special safety perimeter established near Berasia Road depot. Fire & HazMat units executing neutralization.',
    location: 'Berasia Industrial Sector',
    timestamp: '19 minutes ago',
    active: true,
    read: false,
    issuer: 'District Fire & Safety Directorate'
  },
  {
    id: 'ALT-903',
    priority: 'high',
    title: 'Major Traffic Diversion on Main Road',
    description: 'Jyoti Talkies intersection blocked due to collision INC-4721. Traffic diverted via Chetak Bridge.',
    location: 'MP Nagar Zone 1',
    timestamp: '24 minutes ago',
    active: true,
    read: false,
    issuer: 'City Traffic Police Control Room'
  },
  {
    id: 'ALT-904',
    priority: 'high',
    title: 'Hospital ICU Capacity Update',
    description: 'Hamidia Hospital trauma ICU reached 89% occupancy. Secondary ambulance routing directed to AIIMS Bhopal.',
    location: 'District Medical Network',
    timestamp: '28 minutes ago',
    active: true,
    read: false,
    issuer: 'Directorate of Health Services'
  },
  {
    id: 'ALT-905',
    priority: 'info',
    title: 'Disaster Shelter Rations Replenished',
    description: 'Red Cross Relief Center and TT Nagar shelter restocked with potable water and emergency medical kits.',
    location: 'City-wide Shelters',
    timestamp: '31 minutes ago',
    active: true,
    read: true,
    issuer: 'Civil Supplies & Emergency Relief'
  },
  {
    id: 'ALT-906',
    priority: 'info',
    title: 'District Emergency Operations Center Shift Handover',
    description: 'Night Watch Bravo online with 109 field units logged into emergency CAD telemetry.',
    location: 'Emergency Operations Center',
    timestamp: '45 minutes ago',
    active: true,
    read: true,
    issuer: 'State Control Room Operations'
  }
];

export const RESOURCE_STATS = {
  ambulances: { total: 42, available: 31, deployed: 8, maintenance: 3 },
  police: { total: 87, available: 61, deployed: 21, maintenance: 5 },
  fire: { total: 34, available: 25, deployed: 7, maintenance: 2 }
};

export const ANALYTICS_DATA = {
  last24Hours: [
    { hour: '00:00', incidents: 8, resolved: 7 },
    { hour: '02:00', incidents: 5, resolved: 5 },
    { hour: '04:00', incidents: 3, resolved: 4 },
    { hour: '06:00', incidents: 9, resolved: 8 },
    { hour: '08:00', incidents: 18, resolved: 15 },
    { hour: '10:00', incidents: 24, resolved: 22 },
    { hour: '12:00', incidents: 27, resolved: 25 },
    { hour: '14:00', incidents: 22, resolved: 20 },
    { hour: '16:00', incidents: 29, resolved: 26 },
    { hour: '18:00', incidents: 34, resolved: 31 },
    { hour: '20:00', incidents: 28, resolved: 24 },
    { hour: '22:00', incidents: 24, resolved: 19 }
  ],
  incidentsByType: [
    { name: 'Medical Emergency', count: 48, percentage: 38, fill: '#2867A5' },
    { name: 'Road & Traffic', count: 33, percentage: 26, fill: '#E58A16' },
    { name: 'Fire & Rescue', count: 20, percentage: 16, fill: '#C62828' },
    { name: 'Law & Order', count: 15, percentage: 12, fill: '#123B63' },
    { name: 'Natural Disaster', count: 6, percentage: 5, fill: '#218653' },
    { name: 'Public Utilities', count: 4, percentage: 3, fill: '#64748B' }
  ],
  responseTimeByAgency: [
    { agency: 'Police PCR', avgMinutes: 5.23, targetMinutes: 6.00, fastest: '02:11' },
    { agency: 'Fire Services', avgMinutes: 6.70, targetMinutes: 7.00, fastest: '03:04' },
    { agency: '108 Ambulance', avgMinutes: 7.30, targetMinutes: 8.00, fastest: '02:45' },
    { agency: 'HazMat / Rescue', avgMinutes: 8.80, targetMinutes: 10.00, fastest: '04:50' }
  ],
  severityBreakdown: [
    { severity: 'Critical', count: 5, fill: '#C62828' },
    { severity: 'High', count: 11, fill: '#E58A16' },
    { severity: 'Medium', count: 28, fill: '#2867A5' },
    { severity: 'Low', count: 19, fill: '#218653' }
  ],
  kpis: {
    avgResponseTime: '06:42',
    fastestResponse: '02:11',
    slowestResponse: '14:10',
    resolutionRate: '94.2%',
    activeIncidents: 24,
    criticalIncidents: 5,
    unitsDeployed: 67,
    peopleAssisted: 1284,
    availableUnits: 42
  }
};
