package com.example.capstone.capstonebackend.Controller;
import com.example.capstone.capstonebackend.Model.EMIRequest;
import com.example.capstone.capstonebackend.Model.EMIResponse;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;

@RestController
@RequestMapping("/loan")
@CrossOrigin(origins = "http://localhost:3000/loans", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})

public class LoanController {

    public double calculateEMI(double loanAmount, double interestRate, int loanTenure) {
        // Convert annual interest rate to monthly rate
        double monthlyRate = (interestRate / 100) / 12;
        // Number of months
        int months = loanTenure;

        // EMI formula
        double emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

        // Round to 2 decimal places using BigDecimal
        BigDecimal emiRounded = new BigDecimal(emi).setScale(2, RoundingMode.HALF_UP);
        return emiRounded.doubleValue();
    }


    @PostMapping("/calculate-emi")
    public EMIResponse calculateEmi(@RequestBody EMIRequest emiRequest) {
        double emi = calculateEMI(emiRequest.getLoanAmount(), emiRequest.getInterestRate(), emiRequest.getLoanTenure());
        EMIResponse emiResponse = new EMIResponse();
        emiResponse.setEmi(emi);
        return emiResponse;
    }
}

