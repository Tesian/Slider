module ArticlesHelper

  def article_number(article_id)
    "article_" + article_id.to_s
  end

end
