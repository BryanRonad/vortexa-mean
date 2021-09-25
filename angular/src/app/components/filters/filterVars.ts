const vessels = {
  Term: { type: 'textbox' },
  IDs: { type: 'textArray' },
  vessel_classes: {
    type: 'checkbox',
    options: [
      'tiny_tanker',
      'general_purpose',
      'handysize',
      'handymax',
      'panamax',
      'aframax',
      'suezmax',
      'vlcc_plus',
      'sgc',
      'mgc',
      'lgc',
      'vlgc',
    ],
  },
  vessel_product_types: { type: 'textArray' },
  // vessel_scrubbers: { type: 'radio' },
  exact_term_match: { type: 'radio', options: [true, false] },
};

const vesselMovements = {
  filter_activity: {
    type: 'checkbox',
    options: [
      'loading_state',
      'loading_start',
      'loading_end',
      'identified_for_loading_state',
      'unloading_state',
      'unloading_start',
      'unloading_end',
      'unloaded_state',
      'storing_state',
      'storing_start',
      'storing_end',
      'transiting_state',
      'any_activity',
    ],
  },
  filter_time_min: { type: 'date' },
  filter_time_max: { type: 'date' },
  unit: { type: 'radio', options: ['b', 't'] },
  filter_charterers: { type: 'textArray' },
  filter_destinations: { type: 'textArray' },
  filter_origins: { type: 'textArray' },
  filter_owners: { type: 'textArray' },
  filter_products: { type: 'textArray' },
  filter_vessels: { type: 'textArray' },
  filter_vessel_classes: {
    type: 'checkbox',
    options: [
      'aframax',
      'conventional',
      'general_purpose',
      'handymax',
      'handysize',
      'lgc',
      'medmax',
      'mgc',
      'panamax',
      'qflex',
      'qmax',
      'sgc',
      'small_scale',
      'suezmax',
      'tiny_tanker',
      'vlcc_plus',
      'vlgc',
    ],
  },
  filter_vessel_status: { type: 'textbox' },
};

const cargo = {
  Test: { type: 'textbox' },
};

export { vessels, vesselMovements, cargo };
