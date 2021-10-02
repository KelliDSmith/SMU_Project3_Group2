import pandas as pd
csv_file = pd.DataFrame(pd.read_csv("data/aac_intakes_outcomes_new.csv", sep = ","))
csv_file.to_json("static/acc_data.json", orient = "records")