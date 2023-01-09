# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_01_04_145717) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "internet_plans", force: :cascade do |t|
    t.string "description"
    t.float "price"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_internet_plans_on_user_id"
  end

  create_table "plan_requests", force: :cascade do |t|
    t.integer "status", default: 0
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_plan_requests_on_user_id"
  end

  create_table "request_details", force: :cascade do |t|
    t.integer "status", default: 0
    t.bigint "plan_request_id"
    t.bigint "internet_plan_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["internet_plan_id"], name: "index_request_details_on_internet_plan_id"
    t.index ["plan_request_id"], name: "index_request_details_on_plan_request_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password"
    t.string "token"
    t.string "name"
    t.integer "type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
