const CITIES = [
    "AUS", "ABQ", "ALB", "AMA", "ATL", "AUA", "BDL", "BHM", "BNA", "BOI", "BOS", "BUF", "BUR", "BWI", "BZE", "BZN",
    "CHS", "CLE", "CLT", "CMH", "COS", "CRP", "CUN", "CVG", "DAL", "DCA", "DEN", "DSM", "DTW", "ECP", "ELP", "EUG",
    "FAT", "FLL", "GCM", "GEG", "GRR", "GSP", "HAV", "HDN", "HNL", "HOU", "HRL", "IAD", "ICT", "IND", "ISP", "ITO",
    "JAN", "JAX", "KOA", "LAS", "LAX", "LIH", "LBB", "LGA", "LGB", "LIR", "LIT", "MAF", "MBJ", "MCI", "MCO", "MDW",
    "MEM", "MHT", "MIA", "MKE", "MSP", "MSY", "MTJ", "MYR", "NAS", "OAK", "OGG", "OKC", "OMA", "ONT", "ORD", "ORF",
    "PBI", "PDX", "PHL", "PHX", "PIT", "PLS", "PNS", "PSP", "PUJ", "PVD", "PVR", "PWM", "RDU", "RIC", "RNO", "ROC",
    "RSW", "SAN", "SAT", "SAV", "SBA", "SDF", "SEA", "SFO", "SJC", "SJD", "SJO", "SJU", "SLC", "SMF", "SNA", "SRQ",
    "STL", "TPA", "TUL", "TUS", "VPS"
];

// Populate filter options
const select = document.getElementById('airportFilter');
CITIES.forEach(code => {
  const option = document.createElement('option');
  option.value = code;
  option.textContent = code;
  select.appendChild(option);
});

function pad(str, length) {
  return (str + ' '.repeat(length)).slice(0, length);
}

function getSelectedAirports() {
  return Array.from(select.selectedOptions).map(opt => opt.value);
}

function parseFlights(applyFilter = false) {
  const input = document.getElementById('input').value;
  const selectedAirports = getSelectedAirports();
  const lines = input.split('\n');
  const results = [];

  // Updated regex to capture ETD if present
  const flightRegex = /FLT (\d+)\s+FROM\s+(\w{3}) > (\w{3})\s+(\w+)\s+(\S+) > (\S+)(?:.*?ETD (\d{1,2}:\d{2}))?/;

  for (const line of lines) {
    const match = flightRegex.exec(line);
    if (match) {
      const [, flightNum, from, to, tail, gateFrom, gateTo, etd] = match;

      if (applyFilter && selectedAirports.length > 0 && !selectedAirports.includes(from)) {
        continue;
      }

      const paddedFlight = pad(`FLT ${flightNum}`, 9);
      const paddedTail = pad(`[${tail}]`, 9);
      const paddedRoute = pad(`${from} -> ${to}`, 9);
      const paddedGates = pad(`${gateFrom} -> ${gateTo}`, 11);
      const etdPart = etd ? `ETD ${etd}` : "";

      results.push(`${paddedFlight}${paddedTail}${paddedRoute}${paddedGates}${etdPart}`);
    }
  }

  document.getElementById('output').textContent = results.join('\n');
}



function copyAllOutput() {
  const text = document.getElementById('output').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('.copy-all-btn');
    const labelSpan = btn.querySelector('.icon-label');

    const original = labelSpan.innerHTML;
    labelSpan.innerHTML = '✔️';

    setTimeout(() => {
      labelSpan.innerHTML = original;
    }, 1000);
  });
}