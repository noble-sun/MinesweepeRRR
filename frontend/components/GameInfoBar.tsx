import smileFaceIcon from '../src/assets/smileFace.svg'
import deadFaceIcon from '../src/assets/deadFace.svg'

export default function GameInfoBar(
  { time, exploded, mineCount }:
  { time: number, exploded: boolean, mineCount: number }
) {
  const paddedTime = time.toString().padStart(3, "0")
  return (
    <>
      <div className="flex justify-between items-center py-3">
        <span className="flex flex-1 justify-center border p-2"> Mines: {mineCount}</span>
        <div className="cursor-pointer flex flex-1 justify-center" onClick={() => { window.location.reload() }}>
          { exploded ? <img src={deadFaceIcon}/> : <img src={smileFaceIcon} /> }
        </div>
        <span className="flex flex-1 justify-center border p-2"> Time: {paddedTime} </span>
      </div>
    </>
  )
}
