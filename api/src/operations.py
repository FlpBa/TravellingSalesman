from abc import ABC, abstractmethod

class Operation(ABC):
    @abstractmethod
    def transform(self, route, idx_1, idx_2):
        pass

class SwapOperation(Operation):
    def transform(self, route, idx_1, idx_2):
        temp = route[idx_1]
        route[idx_1] = route[idx_2]
        route[idx_2] = temp

class JumpOperation(Operation):
    def transform(self, route, idx_1, idx_2):
        temp = route[idx_1]
        i = idx_1
        while i != idx_2:
            if i == len(route) - 1:
                route[i] = route[0]
                i = 0
            else:
                route[i] = route[i+1]
                i += 1
        route[idx_2] = temp