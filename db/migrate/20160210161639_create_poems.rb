class CreatePoems < ActiveRecord::Migration
  def change
    create_table :poems do |t|
      t.string :author
      t.string :text

      t.timestamps null: false
    end
  end
end
