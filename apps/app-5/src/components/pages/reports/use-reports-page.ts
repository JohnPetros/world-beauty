import { useState } from 'react'

export function useReportsPage() {
  const [selectedReport, setSelectedReport] = useState('customers-by-most-consumption')

  function handleSelectChange(selectedReport: string) {
    setSelectedReport(selectedReport)
  }

  return {
    selectedReport,
    handleSelectChange,
  }
}
