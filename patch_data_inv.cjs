const fs = require('fs');
let fileStr = fs.readFileSync('src/data.ts', 'utf8');

// pull-ups
fileStr = fileStr.replace(/\{ id: 'f_aust_pulls'/g, "{ id: 'f_aust_pulls', inventoryReq: 'pullup_bar'");
fileStr = fileStr.replace(/\{ id: 'e_neg_pullups'/g, "{ id: 'e_neg_pullups', inventoryReq: 'pullup_bar'");
fileStr = fileStr.replace(/\{ id: 'd_pullups'/g, "{ id: 'd_pullups', inventoryReq: 'pullup_bar'");
fileStr = fileStr.replace(/\{ id: 'c_chin_ups'/g, "{ id: 'c_chin_ups', inventoryReq: 'pullup_bar'");
fileStr = fileStr.replace(/\{ id: 'c_mixed_pulls'/g, "{ id: 'c_mixed_pulls', inventoryReq: 'pullup_bar'");
fileStr = fileStr.replace(/\{ id: 'b_strict_pulls'/g, "{ id: 'b_strict_pulls', inventoryReq: 'pullup_bar'");
fileStr = fileStr.replace(/\{ id: 'a_strict_pulls_f'/g, "{ id: 'a_strict_pulls_f', inventoryReq: 'pullup_bar'");
fileStr = fileStr.replace(/\{ id: 'b_mu_prep'/g, "{ id: 'b_mu_prep', inventoryReq: 'pullup_bar'");
fileStr = fileStr.replace(/\{ id: 'b_windshield_wipers'/g, "{ id: 'b_windshield_wipers', inventoryReq: 'pullup_bar'");
fileStr = fileStr.replace(/\{ id: 'a_mu'/g, "{ id: 'a_mu', inventoryReq: 'pullup_bar'");
fileStr = fileStr.replace(/\{ id: 's_weighted_pulls'/g, "{ id: 's_weighted_pulls', inventoryReq: 'pullup_bar'");
fileStr = fileStr.replace(/\{ id: 'f_aust_pulls_f'/g, "{ id: 'f_aust_pulls_f', inventoryReq: 'pullup_bar'");
fileStr = fileStr.replace(/\{ id: 'e_neg_pulls_f'/g, "{ id: 'e_neg_pulls_f', inventoryReq: 'pullup_bar'");
fileStr = fileStr.replace(/\{ id: 'd_pullups_f'/g, "{ id: 'd_pullups_f', inventoryReq: 'pullup_bar'");
fileStr = fileStr.replace(/\{ id: 'c_chin_ups_f'/g, "{ id: 'c_chin_ups_f', inventoryReq: 'pullup_bar'");

// dips
fileStr = fileStr.replace(/\{ id: 'd_dips'/g, "{ id: 'd_dips', inventoryReq: 'dip_station'");
fileStr = fileStr.replace(/\{ id: 'c_dips'/g, "{ id: 'c_dips', inventoryReq: 'dip_station'");
fileStr = fileStr.replace(/\{ id: 'd_dips_f'/g, "{ id: 'd_dips_f', inventoryReq: 'dip_station'");
fileStr = fileStr.replace(/\{ id: 'c_dips_f'/g, "{ id: 'c_dips_f', inventoryReq: 'dip_station'");

// rings
fileStr = fileStr.replace(/\{ id: 's_ring_mu'/g, "{ id: 's_ring_mu', inventoryReq: 'rings'");
fileStr = fileStr.replace(/\{ id: 's_ring_rows_f'/g, "{ id: 's_ring_rows_f', inventoryReq: 'rings'");

// hanging knee raises
fileStr = fileStr.replace(/\{ id: 'd_hanging_knee_raises'/g, "{ id: 'd_hanging_knee_raises', inventoryReq: 'pullup_bar'");
fileStr = fileStr.replace(/\{ id: 'd_hanging_knee_raises_f'/g, "{ id: 'd_hanging_knee_raises_f', inventoryReq: 'pullup_bar'");

fs.writeFileSync('src/data.ts', fileStr);
