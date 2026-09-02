import { miniPrograms, qrSrc, type MiniProgram } from './apps'

function MiniProgramCard({ app }: { app: MiniProgram }) {
  return (
    <article className="miniapp-card">
      <div className="miniapp-card__body">
        <h2 className="miniapp-card__name">{app.name}</h2>
        {app.intro && <p className="miniapp-card__intro">{app.intro}</p>}
        {app.link && (
          <a className="miniapp-card__link" href={app.link} target="_blank" rel="noreferrer">
            打开
          </a>
        )}
      </div>
      {app.qr && (
        <img className="miniapp-card__qr" src={qrSrc(app.qr)} alt={`${app.name} 二维码`} />
      )}
    </article>
  )
}

export function MiniProgramList() {
  if (miniPrograms.length === 0) {
    return <p className="quote-list__empty">还没有小程序，去 apps.json 里记下第一款吧。</p>
  }

  return (
    <div className="miniapp-list">
      {miniPrograms.map((app) => (
        <MiniProgramCard key={app.name} app={app} />
      ))}
    </div>
  )
}
