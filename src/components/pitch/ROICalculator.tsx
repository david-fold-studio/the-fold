'use client'

import { useState } from 'react'

interface CalculatorOption {
  setupCost: number
  monthlyCost: number
  estimatedHoursAfter: number
  optionName: string
}

interface ROICalculatorProps {
  calculators: CalculatorOption[]
  hourlyRate?: number
}

export default function ROICalculator({
  calculators,
  hourlyRate = 50
}: ROICalculatorProps) {
  const [customHourlyRate, setCustomHourlyRate] = useState(hourlyRate)
  const [currentHoursPerMonth, setCurrentHoursPerMonth] = useState(64)

  return (
    <div className="grid md:grid-cols-[40%_1fr] gap-8">
      {/* Sticky Inputs Sidebar */}
      <div className="md:sticky md:top-24 md:self-start">
        <h2 className="h2 mb-6">Calculate Your ROI</h2>
        <div className="bg-[#0d0d0d] rounded-2xl border border-white/5 p-6">
          <h3 className="h3 mb-6">Your Numbers</h3>
          <div className="flex flex-col gap-6">
            <div>
              <label className="body-sm block mb-2" style={{ color: 'var(--color-grey-400)' }}>
                Current Hours Spent Per Month
              </label>
              <input
                type="number"
                value={currentHoursPerMonth}
                onChange={(e) => setCurrentHoursPerMonth(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white body-md"
                style={{ fontFamily: 'var(--font-family-inter)' }}
              />
            </div>

            <div>
              <label className="body-sm block mb-2" style={{ color: 'var(--color-grey-400)' }}>
                Hourly Value ($)
              </label>
              <input
                type="number"
                value={customHourlyRate}
                onChange={(e) => setCustomHourlyRate(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white body-md"
                style={{ fontFamily: 'var(--font-family-inter)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Option Cards */}
      <div className="flex flex-col gap-6">
        {calculators.map((calc, index) => {
          const hoursSaved = currentHoursPerMonth - calc.estimatedHoursAfter
          const monthlySavings = hoursSaved * customHourlyRate
          const netMonthlySavings = monthlySavings - calc.monthlyCost
          const breakEvenMonths = calc.setupCost / netMonthlySavings
          const firstYearSavings = monthlySavings * 12
          const firstYearCosts = calc.setupCost + (calc.monthlyCost * 12)
          const firstYearROI = ((firstYearSavings - firstYearCosts) / firstYearCosts) * 100

          return (
            <div key={index} className="bg-[#0d0d0d] rounded-2xl border border-white/5 p-6">
              <h3 className="h3 mb-4">{calc.optionName}</h3>

              {/* Estimated Hours Display */}
              <div className="mb-6 p-3 bg-black/40 rounded-lg border border-white/5">
                <div className="body-sm" style={{ color: 'var(--color-grey-400)' }}>
                  Estimated time after automation: <span className="font-medium" style={{ color: 'var(--color-grey-200)' }}>{calc.estimatedHoursAfter} hours/month</span>
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                  <div className="body-sm mb-2" style={{ color: 'var(--color-grey-400)' }}>
                    Monthly Savings
                  </div>
                  <div className="h2" style={{ color: 'var(--color-grey-100)' }}>
                    ${monthlySavings.toLocaleString()}
                  </div>
                  <div className="body-sm mt-1" style={{ color: 'var(--color-grey-500)' }}>
                    {hoursSaved} hrs saved × ${customHourlyRate}/hr
                  </div>
                </div>

                <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                  <div className="body-sm mb-2" style={{ color: 'var(--color-grey-400)' }}>
                    Net Monthly Savings
                  </div>
                  <div className="h2" style={{ color: 'var(--color-grey-100)' }}>
                    ${netMonthlySavings.toLocaleString()}
                  </div>
                  <div className="body-sm mt-1" style={{ color: 'var(--color-grey-500)' }}>
                    After ${calc.monthlyCost}/mo costs
                  </div>
                </div>

                <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                  <div className="body-sm mb-2" style={{ color: 'var(--color-grey-400)' }}>
                    Break-Even
                  </div>
                  <div className="h2" style={{ color: 'var(--color-grey-100)' }}>
                    {breakEvenMonths.toFixed(1)} mo
                  </div>
                  <div className="body-sm mt-1" style={{ color: 'var(--color-grey-500)' }}>
                    ${calc.setupCost.toLocaleString()} setup cost
                  </div>
                </div>

                {/* First Year Summary */}
                <div className="p-4 rounded-lg border" style={{
                  background: 'linear-gradient(135deg, rgba(47, 84, 143, 0.15) 0%, rgba(89, 159, 194, 0.08) 100%)',
                  borderColor: 'rgba(89, 159, 194, 0.2)'
                }}>
                  <div className="body-sm mb-2" style={{ color: 'var(--color-azure-85)' }}>
                    First Year ROI
                  </div>
                  <div className="h2" style={{ color: 'var(--color-azure-85)' }}>
                    {firstYearROI.toFixed(0)}%
                  </div>
                  <div className="body-sm mt-1" style={{ color: 'var(--color-azure-55)' }}>
                    ${firstYearSavings.toLocaleString()} saved - ${firstYearCosts.toLocaleString()} invested
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
