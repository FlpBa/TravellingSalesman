import pytest

import src.model as model

def test_swapOperation():
    swapOperation = model.SwapOperation()
    route = [1,2,3,4,5,6]
    swapOperation.transform(route, 1, 5)
    assert route == [1,6,3,4,5,2]

def test_jumpOperation():
    op = model.JumpOperation()
    route = [1,2,3,4,5,6]
    op.transform(route, 1, 5)
    assert route == [1,3,4,5,6,2]

    op.transform(route, 4, 0)
    assert route == [6,3,4,5,2,1]