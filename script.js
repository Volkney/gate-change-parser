function pad(str, length) {
    return (str + ' '.repeat(length)).slice(0, length);
  }

  function parseFlights(applyFilter = false) {
    const input = document.getElementById('input').value;
    const airportFilter = document.getElementById('airportFilter').value.trim().toUpperCase();
    const lines = input.split('\n');
    const results = [];

    const flightRegex = /FLT (\d+)\s+FROM\s+(\w{3}) > (\w{3})\s+(\w+)\s+(\S+) > (\S+)/;

    for (const line of lines) {
      const match = flightRegex.exec(line);
      if (match) {
        const [, flightNum, from, to, tail, gateFrom, gateTo] = match;

        if (applyFilter && airportFilter && from !== airportFilter) {
          continue; // skip if not matching filtered airport
        }

        const paddedFlight = pad(`FLT ${flightNum}`, 9);
        const paddedTail = pad(`[${tail}]`, 11);
        const paddedRoute = pad(`${from} -> ${to}`, 13);
        const paddedGates = `${gateFrom} -> ${gateTo}`;

        results.push(`${paddedFlight}${paddedTail}${paddedRoute}${paddedGates}`);
      }
    }

    document.getElementById('output').textContent = results.join('\n');
  }