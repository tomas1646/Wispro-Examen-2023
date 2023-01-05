import React, { useEffect } from 'react';
import { showErrorMessage } from '../components/SnackBar';
import { GetPlansGroupedByIsp, InternetPlans } from './internetPlansService';

export default function InternetPlansList() {
  const [internetPlans, setInternetPlans] = React.useState<
    Map<String, InternetPlans[]>
  >(new Map<string, InternetPlans[]>());

  useEffect(() => {
    GetPlansGroupedByIsp()
      .then((response) => {
        const map = new Map<string, InternetPlans[]>(
          Object.entries(response.content)
        );
        setInternetPlans(map);
      })
      .catch((err) => {
        showErrorMessage(err.response.data.message || 'Unexcpected Error');
      });
  }, []);

  return (
    <div>
      {internetPlans &&
        Array.from(internetPlans.keys()).map((key) => (
          <>
            <h2>{key}</h2>
            {internetPlans.get(key)?.map((plan) => (
              <h3>{plan.description}</h3>
            ))}
          </>
        ))}
    </div>
  );
}
