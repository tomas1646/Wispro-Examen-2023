Isp.create(username: 'westnet', email: 'westnet@gmail.com', password: 'password', name: 'westnet')
Isp.create(username: 'ctc', email: 'ctc@gmail.com', password: 'password', name: 'ctc')

InternetPlan.create(description: '30mb simetrico', price: 1000, user: Isp.first)
InternetPlan.create(description: '50mb simetrico', price: 2000, user: Isp.first)

InternetPlan.create(description: '50mb simetrico', price: 1000, user: Isp.last)
InternetPlan.create(description: '100mb simetrico', price: 2000, user: Isp.last)
InternetPlan.create(description: '200mb simetrico', price: 3000, user: Isp.last)

c1 = Client.create(username: 'user1', email: 'user1@gmail.com', password: 'password', name: 'Tomas Espinosa')
c2 = Client.create(username: 'user2', email: 'user2@gmail.com', password: 'password', name: 'Joaco Cortez')

pr1 = PlanRequest.create(user: c1)
RequestDetail.create(plan_request: pr1, internet_plan: InternetPlan.first)

pr2 = PlanRequest.create(user: c2)
RequestDetail.create(plan_request: pr2, internet_plan: InternetPlan.first)
