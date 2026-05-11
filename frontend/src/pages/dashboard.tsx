import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar1,
  Cake,
  ChartNoAxesCombinedIcon,
  Heart,
  Users,
} from "lucide-react";

import { useEffect, useState } from "react";
import { FormBirthday } from "@/components/birthday/BirthdayForm";
import {
  allBirthdays,
  getNumbersBirthdaysByMonth,
  getNumberFamilyBirthdays,
  getNumberFriendsBirthdays,
} from "@/api/Birthday";

const getMonth = () => {
  return new Date().toLocaleString("es-ES", { month: "long" });
};

function Dashboard() {
  const [birthdays, setBirthdays] = useState([]);
  const [birthdaysMonth, setBirthdaysMonth] = useState(0);
  const [birthdaysFamily, setBirthdaysFamily] = useState(0);
  const [birthdaysFriends, setBirthdaysFriends] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const total = await getNumberFriendsBirthdays();
      setBirthdaysFriends(total);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const total = await getNumberFamilyBirthdays();
      setBirthdaysFamily(total);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const total = await getNumbersBirthdaysByMonth();
      setBirthdaysMonth(total);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBirthdays = async () => {
      const data = await allBirthdays();
      setBirthdays(data.data);
    };
    fetchBirthdays();
  }, []);

  return (
    <div className="p-1">
      <div className="flex">
        <div>
          <p className="text-5xl">Hola, Usuario</p>
          <p className="text-lg">Tienes X celebraciones en esta semana</p>
        </div>
        <div>
          <FormBirthday />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1">
        {/*Dia de cumpleanos*/}
        <Card className="bg-linear-to-b from-teal-700 via-teal-500 to-green-300 p-3">
          <CardTitle className="text-white text-2xl">
            Que dia tan tranquilo!
          </CardTitle>
          <CardContent className="text-white text-sm">
            Hoy no tienes cumpleaños pendientes. Es el momento perfecto para
            revisar tu lista y asegurarte de no olvidar ninguno.
          </CardContent>
          <CardFooter>
            <Button className="bg-white text-black hover:bg-teal-400 hover:text-white hover:border-white">
              <Calendar1 />
              Ir a calendario
            </Button>
          </CardFooter>
        </Card>
        <div className="flex flex-col gap-1">
          <Card className="bg-linear-to-bl from-blue-950 via-sky-700/80 to-blue-700 p-3">
            {/*resumen del mes*/}
            <CardTitle className="text-white text-xl flex">
              Resumen de {getMonth()}
              <ChartNoAxesCombinedIcon className="text-white" />
            </CardTitle>
            <Card className="bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-4">
              <CardTitle className="text-white text-sm">
                Total este mes
              </CardTitle>
              <CardContent className="text-2xl">
                <div className="flex shirk">
                  <Cake className="text-blue-100" />
                  <p className=" text-sky-200">{birthdaysMonth}</p>
                  <p className="s text-blue-100">Cumpleaños</p>
                </div>
              </CardContent>
            </Card>
            {/*entorno social*/}
            <Card className="bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-4">
              <CardTitle className="text-white text-sm">
                Entorno social
              </CardTitle>
              {/*<CardContent className="">*/}
              <div className="flex justify-between">
                <div className="flex flex-col justify-center items-center border border-sky-400/50 rounded-2xl p-3">
                  <Heart className="text-blue-100 w-6 h-6" />
                  <p className=" text-sky-200 text-3xl">{birthdaysFamily}</p>
                  <p className="text-white">Cumpleaños familiares</p>
                </div>
                <div className="flex flex-col justify-center items-center border border-sky-400/50 rounded-2xl p-3">
                  <Users className="text-blue-100" />
                  <p className=" text-sky-200 text-3xl">{birthdaysFriends}</p>
                  <p className="text-white">Cumpleaños de amigos</p>
                </div>
              </div>
              {/*</CardContent>*/}
            </Card>
          </Card>
        </div>
      </div>

      <div>
        <h1>Proximos cumples</h1>
        <Card>
          {birthdays.map((item: any) => (
            <p key={item.id}>{item.name}</p>
          ))}
        </Card>
      </div>
    </div>
  );
}
export default Dashboard;
