class PoemsController < ApplicationController
  def random
    rand_id = Proc.new { (1..Poem.all.length).to_a.sample }.call
    @poem = Poem.find(rand_id).text
    @poems = Poem.all.shuffle.map(&:text)
  end
end
