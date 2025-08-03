

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

    const flightRegex = /FLT (\d+)\s+FROM\s+(\w{3}) > (\w{3})\s+(\w+)\s+(\S+) > (\S+)/;

    for (const line of lines) {
      const match = flightRegex.exec(line);
      if (match) {
        const [, flightNum, from, to, tail, gateFrom, gateTo] = match;

        if (applyFilter && selectedAirports.length > 0 && !selectedAirports.includes(from)) {
          continue;
        }

        const paddedFlight = pad(`FLT ${flightNum}`, 9);
        const paddedTail = pad(`[${tail}]`, 11);
        const paddedRoute = pad(`${from} -> ${to}`, 13);
        const paddedGates = `${gateFrom} -> ${gateTo}`;

        results.push(`${paddedFlight}${paddedTail}${paddedRoute}${paddedGates}`);
      }
    }

    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    results.forEach(line => {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'output-line';

    const textSpan = document.createElement('span');
    textSpan.className = 'output-text';
    textSpan.textContent = line;

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(line).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy'), 1000);
        });
    };

    lineDiv.appendChild(textSpan);
    lineDiv.appendChild(copyBtn);
    outputDiv.appendChild(lineDiv);
});

  }