import requests
import time
from math import floor, ceil
ID = -1
found_once = False

history = []

requests.post("http://localhost:8080/control/stop")
size = requests.get("http://localhost:8080/information").json()["size"]
def get(x, y, cells):
    for cell in cells:
        if cell["x"] == x%size and cell["y"] == y%size:
            return cell
    return None

def radar(center_x, center_y, cells, size, me_id):
    for i_x in range(size):
        row = ""
        for i_y in range(size):
            o_x = ceil(i_x-(size/2))
            o_y = ceil(i_y-(size/2))
            x = ceil((o_x)+center_x)
            y = ceil((o_y)+center_y)
            
            cell = get(x, y, cells) 
            #print(f"c_x: {center_x} c_y: {center_y} o_x: {o_x} o_y: {o_y} x: {x} y: {y} cell: {cell} size: {size}")
            if cell is None:
                row+=" "
            elif cell["id"] == me_id:
                row+="O"
            else:
                row+="X"
        print(row)

while True:
    requests.post("http://localhost:8080/control/step")
    state = requests.get("http://localhost:8080/state").json()
    found_in_iteration = False

    time.sleep(0.01)

    all_cells = state["cells"]

    if ID == -1:
        ID = all_cells[0]["id"]
        print(ID)

    for i in all_cells:
        if i["id"] == ID:
            found_once = True
            found_in_iteration = True
            
            print("---------------------------------")
            print(f"AGE: {i['age']} X: {i['x']} Y: {i['y']} ID: {i['id']} ITERATION: {state['iterations']}")
            for register in i["registers"]:
                name = register["registerName"]
                value = register["registerValue"]
                print(f"{name} : {value}")
            ip = i["instructionPointer"]
            print(f"Next Instruction: {i['genome'][ip]['translatedInstruction']}")
            radar(i["x"], i["y"], all_cells, 16, i["id"])

    if (not found_in_iteration and found_once):
        break

#requests.post("http://localhost:8080/control/start")