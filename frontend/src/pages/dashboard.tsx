import { Card, CardTitle } from '../components/ui/card'

function Dashboard() {
  return (
    <div className='p-1'>
      <div>
        <h1>Hola, Compa</h1>
        <p>Tienes X celebraciones en esta semana</p>
      </div>

      <div className='grid grid-cols-2 gap-1'>
        <Card className='bg-purple-400'>
          <CardTitle>
            Cumpleaños de hoy
          </CardTitle>
        </Card>
        <div className='flex flex-col gap-1'>
          <Card className='bg-sky-700'>
            <CardTitle>
              Proximo regalo
            </CardTitle>
          </Card>

          <Card className='bg-amber-500'>
            <CardTitle>
              Dia mas cumpleanos
            </CardTitle>
          </Card>
        </div>
      </div>

      <div>
        <h1>Proximos cumples</h1>
        <Card>

        </Card>
      </div>
    </div>
  )
}
export default Dashboard;
