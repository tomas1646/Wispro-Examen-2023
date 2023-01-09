isp1 = Isp.create(username: 'movistar', email: 'westnet@gmail.com', password: 'password', name: 'Movistar')
isp2 = Isp.create(username: 'claro', email: 'ctc@gmail.com', password: 'password', name: 'Claro')

ip1 = InternetPlan.create(description: '30mb Symmetrical', price: 1000, user: isp1)
ip2 = InternetPlan.create(description: '50mb Symmetrical', price: 2000, user: isp1)

ip3 = InternetPlan.create(description: '50mb Symmetrical', price: 1000, user: isp2)
ip4 = InternetPlan.create(description: '100mb Symmetrical', price: 2000, user: isp2)
ip5 = InternetPlan.create(description: '200mb Symmetrical', price: 3000, user: isp2)

c1 = Client.create(username: 'tomas', email: 'user1@gmail.com', password: 'password', name: 'Tomas Espinosa')
c2 = Client.create(username: 'joaquin', email: 'user2@gmail.com', password: 'password', name: 'Joaco Cortez')

pr1 = PlanRequest.create(user: c1)
RequestDetail.create(plan_request: pr1, internet_plan: ip1)
pr1.update(created_at: Date.today - 1.month - 5.days)
pr1.accept

pr2 = PlanRequest.create(user: c1)
RequestDetail.create(plan_request: pr2, internet_plan: ip1)
pr2.update(created_at: Date.today - 1.month)
pr2.reject

pr3 = PlanRequest.create(user: c1)
RequestDetail.create(plan_request: pr3, internet_plan: ip1)
pr3.update(created_at: Date.today - 15.days)
pr3.accept
pr3.modify_plan(ip2.id)

pr4 = PlanRequest.create(user: c1)
RequestDetail.create(plan_request: pr4, internet_plan: ip3)

pr5 = PlanRequest.create(user: c2)
RequestDetail.create(plan_request: pr5, internet_plan: ip3)
pr5.update(created_at: Date.today - 1.month - 5.days)
pr5.accept

pr6 = PlanRequest.create(user: c2)
RequestDetail.create(plan_request: pr6, internet_plan: ip5)
pr6.update(created_at: Date.today - 1.month)
pr6.reject

pr7 = PlanRequest.create(user: c2)
RequestDetail.create(plan_request: pr7, internet_plan: ip3)
pr7.update(created_at: Date.today - 15.days)
pr7.accept
pr7.modify_plan(ip5.id)

pr8 = PlanRequest.create(user: c2)
RequestDetail.create(plan_request: pr8, internet_plan: ip4)
