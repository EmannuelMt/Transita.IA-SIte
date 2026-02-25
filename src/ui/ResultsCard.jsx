import React from 'react'

export default function ResultsCard({ results }) {
  if (!results) {
    return (
      <div className="bg-white p-4 rounded border">
        <h4 className="font-medium">Resultados</h4>
        <p className="text-sm text-gray-500 mt-2">Nenhuma consulta realizada ainda.</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 rounded border">
      <h4 className="font-medium mb-3">Resultados da Consulta</h4>
      {results.map((r, idx) => (
        <div key={idx} className="border rounded p-3 mb-3">
          <div className="flex items-center justify-between">
            <h5 className="font-semibold">{r.city}</h5>
            <span className={`text-xs ${r.restrictions.length ? 'text-red-600' : 'text-green-600'}`}>
              {r.restrictions.length ? 'Risco' : 'OK'}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">{r.note}</p>
          {r.restrictions.length > 0 && (
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
              {r.restrictions.map((rule, i) => (
                <li key={i}>
                  <strong>{rule.type}:</strong> {rule.rule} — <a className="text-indigo-600" href={rule.link} target="_blank" rel="noreferrer">ver</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
