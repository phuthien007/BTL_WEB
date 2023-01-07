import React from 'react'
import ChartistGraph from 'react-chartist'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import style from './style.module.scss'

const Chart11v2 = () => {
  const data = {
    series: [[42, 80, 67, 84, 74, 82, 64]],
  }

  const options = {
    axisX: {
      showLabel: false,
      showGrid: false,
      offset: 0,
    },
    axisY: {
      showLabel: false,
      showGrid: false,
      offset: 0,
    },
    showArea: true,
    high: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    fullWidth: true,
    height: '110px',
    showPoint: true,
    plugins: [
      ChartistTooltip({
        anchorToPoint: false,
        appendToBody: true,
        seriesName: false,
      }),
    ],
  }

  return (
    <div className="card-body overflow-hidden position-relative">
      <div className="font-size-36 font-weight-bold text-dark mb-n2">56</div>
      <div className="text-uppercase">blogs</div>
      <div className={style.chartContainer}>
        <ChartistGraph
          className={`height-200 ct-hidden-points ${style.chart}`}
          data={data}
          options={options}
          type="Line"
        />
      </div>
    </div>
  )
}

export default Chart11v2
